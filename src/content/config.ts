import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Makaleler koleksiyonu
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image(),
    heroAlt: z.string(),
    tag: z.string(),
    author: z.string().default('Av. Fatih Turan'),
    draft: z.boolean().default(false),
  }),
});

// Site genel bilgileri
const site = defineCollection({
  loader: file('src/content/data/site.json'),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    contact: z.object({
      phone: z.string(),
      phoneLink: z.string(),
      email: z.string(),
      whatsapp: z.string(),
    }),
  }),
});

// Hakkımda sayfası içeriği
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

// Çalışma alanları
const workAreas = defineCollection({
  loader: file('src/content/data/work-areas.json'),
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

// Yasal sayfalar (KVKK, Gizlilik, Çerez, Yasal Uyarı)
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
  }),
});

// Chatbot yanıtları ve ayarları
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
