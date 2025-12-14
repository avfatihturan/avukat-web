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
    name: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    // Contact nesnesi ZORUNLU, içindeki alanlar OPSİYONEL
    contact: z.object({
      phone: z.string().optional(),
      phoneLink: z.string().optional(),
      email: z.string().optional(),
      whatsapp: z.string().optional(),
      address: z.string().optional(),
      mapUrl: z.string().optional(),
    }), 
    social: z.record(z.string()).optional(),
  }),
});

const about = defineCollection({
  loader: file('src/content/data/about.json'),
  schema: z.object({
    paragraphs: z.array(z.string()).optional(),
    signature: z.object({
      name: z.string().optional(),
      bar: z.string().optional(),
    }).optional(),
  }),
});

const workAreas = defineCollection({
  loader: file('src/content/data/work-areas.json'),
  schema: z.object({
    id: z.string().optional(),
    icon: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    linkText: z.string().optional(),
    linkUrl: z.string().optional(),
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
    greeting: z.string().optional(),
    welcomeMessage: z.string().optional(),
    assistantName: z.string().optional(),
    options: z.array(z.object({
      key: z.string(),
      label: z.string(),
      userText: z.string(),
      botResponse: z.string(),
      icon: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { articles, site, about, workAreas, legal, chatbot };