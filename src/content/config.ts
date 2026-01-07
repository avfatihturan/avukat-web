import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    tag: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().optional(),
    // YENİ: Bu hizmet hangi makale etiketini çeksin?
    relatedTag: z.string().optional(), 
    draft: z.boolean().default(false),
  }),
});

const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const site = defineCollection({ type: 'data', schema: z.any() });
const data = defineCollection({ type: 'data', schema: z.any() });

export const collections = { articles, legal, services, site, data };