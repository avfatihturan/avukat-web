import { defineCollection, z } from 'astro:content';

/* Makaleler */
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // GÜNCELLEME: coerce.date() her türlü tarihi kabul eder
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    tag: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/* Yasal metinler (legal) */
const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Yasal sayfalara tarih eklesen de eklemesen de hata vermesin:
    pubDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

/* Site genel ayarları */
const site = defineCollection({
  type: 'data',
  schema: z.any(),
});

/* Genel veri koleksiyonu */
const data = defineCollection({
  type: 'data',
  schema: z.any(),
});

export const collections = {
  articles,
  legal,   
  site,
  data,
};