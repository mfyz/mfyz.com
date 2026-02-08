import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
    imageURL: z.string().optional(),
    tags: z.array(z.string()),
    hidden: z.boolean().optional().default(false),
    // Social media post text (max 280 chars for Twitter compatibility)
    social_post: z
      .string()
      .max(255, "Social post must be 255 characters or less")
      .optional(),
  }),
});

export const collections = { blog };
