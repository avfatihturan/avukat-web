import { defineCollection, z } from 'astro:content';

/* Makaleler */
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    heroImage: z.string(),
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
    description: z.string().optional(), // yasal sayfalarda opsiyonel olsun
    draft: z.boolean().default(false),
  }),
});

/* Site genel ayarları (site.json) */
const site = defineCollection({
  type: 'data',
  schema: z.any(),
});

/* Genel veri koleksiyonu (chatbot, workAreas vb. için) */
const data = defineCollection({
  type: 'data',
  schema: z.any(),
});

export const collections = {
  articles,
  legal,   // ✅ bunu ekle
  site,
  data,
};