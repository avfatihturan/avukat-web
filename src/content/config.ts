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

/* Hizmet Sayfaları (Services) - YENİ */
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(), // SEO ve kart açıklaması için
    heroImage: z.string().optional(), // Sayfa başındaki büyük görsel
    heroAlt: z.string().optional(),
    icon: z.string().optional(), // Menüde veya kartta çıkacak ikon adı
    order: z.number().optional(), // Sıralama (1, 2, 3 diye dizmek için)
    draft: z.boolean().default(false),
  }),
});

/* Yasal Metinler (Legal) */
const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

/* Site Genel Verileri */
const site = defineCollection({ type: 'data', schema: z.any() });
const data = defineCollection({ type: 'data', schema: z.any() });

// 'services' koleksiyonunu dışarı aktarmayı unutmuyoruz
export const collections = { articles, legal, services, site, data };