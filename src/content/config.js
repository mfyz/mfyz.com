import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    // Transform string to Date object
    date: z.coerce.date(),
    imageURL: z.string().optional(),
    tags: z.array(z.string()).optional(),
    hidden: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
