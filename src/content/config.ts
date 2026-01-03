import { defineCollection, z } from 'astro:content';

/* Makaleler (Blog) */
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // Blogda tarih zorunlu
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    tag: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/* Yasal Metinler (Legal) */
const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // BURASI ÖNEMLİ: Tarihi opsiyonel yaptık, hata vermez artık.
    pubDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

/* Site Genel Verileri */
const site = defineCollection({ type: 'data', schema: z.any() });
const data = defineCollection({ type: 'data', schema: z.any() });

export const collections = { articles, legal, site, data };