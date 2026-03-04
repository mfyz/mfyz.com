import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      date: z.coerce.date(),
      imageURL: z.string().optional(),
      tags: z.array(z.string()),
      hidden: z.boolean().optional().default(false),
      // Social media post text (max 255 chars)
      social_post: z
        .string()
        .max(255, "Social post must be 255 characters or less")
        .optional(),
    })
    .refine(
      (data) => data.date.getFullYear() < 2026 || !!data.social_post,
      {
        message: "social_post is required for posts dated 2026 and later",
        path: ["social_post"],
      }
    ),
});

export const collections = { blog };
