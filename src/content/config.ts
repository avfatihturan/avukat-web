import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image(),
    heroAlt: z.string().optional(),
    tag: z.string().optional(),
    author: z.string().default('Av. Fatih Turan'),
    draft: z.boolean().default(false),
  }),
});

const site = defineCollection({
  loader: file('src/content/data/site.json'),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    contact: z.object({
      phone: z.string(),
      phoneLink: z.string(),
      email: z.string(),
      whatsapp: z.string(),
      address: z.string(),
      mapUrl: z.string().optional(),
    }),
    social: z.record(z.string()).optional(),
  }),
});

const about = defineCollection({
  loader: file('src/content/data/about.json'),
  schema: z.object({
    paragraphs: z.array(z.string()),
    signature: z.object({
      name: z.string(),
      bar: z.string(),
    }),
  }),
});

// GÜNCELLENEN KISIM: ctaText ve ctaLink eklendi
const workAreas = defineCollection({
  loader: file('src/content/data/work-areas.json'),
  schema: z.object({
    id: z.string().optional(),
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
  }),
});

const chatbot = defineCollection({
  loader: file('src/content/data/chatbot.json'),
  schema: z.object({
    greeting: z.string(),
    welcomeMessage: z.string(),
    assistantName: z.string(),
    options: z.array(z.object({
      key: z.string(),
      label: z.string(),
      userText: z.string(),
      botResponse: z.string(),
      icon: z.string().optional(),
    })),
  }),
});

export const collections = { articles, site, about, workAreas, legal, chatbot };