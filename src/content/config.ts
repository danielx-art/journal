import { defineCollection, z } from "astro:content";
import type { Lang } from "../types";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lang: z.enum(["en", "br"]) as z.ZodType<Lang>,
    translationOf: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    related: z.array(z.string()).optional(),
  }),
});

export const collections = { posts };