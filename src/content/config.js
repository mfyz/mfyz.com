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
  }),
});

export const collections = { blog };
