import { defineCollection, z } from 'astro:content';

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

// HATA ÇÖZÜMÜ: "site", "chatbot", "workAreas" klasörleri yerine
// tek bir "data" klasörü kullanıyoruz. Katı kuralları (schema) kaldırdık (z.any).
// Bu sayede Vercel "klasör eksik" hatası vermeyecek.
const data = defineCollection({
  type: 'data',
  schema: z.any(),
});

export const collections = {
  articles,
  data, 
};