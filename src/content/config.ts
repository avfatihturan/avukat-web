import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    // BURASI KRİTİK: image() değil, z.string() olmalı.
    heroImage: z.string(),
    heroAlt: z.string().optional(),
    tag: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const workAreas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    ctaText: z.string().default('Detaylı Bilgi'),
    ctaLink: z.string().default('/iletisim'),
    order: z.number().default(99),
  }),
});

const site = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    contact: z.object({
      phone: z.string(),
      phoneLink: z.string(),
      email: z.string(),
      address: z.string(),
      whatsapp: z.string(),
      mapsLink: z.string().optional(),
    }),
    social: z.object({
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
    }).optional(),
  }),
});

const chatbot = defineCollection({
  type: 'data',
  schema: z.object({
    greeting: z.string(),
    welcomeMessage: z.string(),
    assistantName: z.string(),
    options: z.array(z.object({
      key: z.string(),
      label: z.string(),
      icon: z.string().optional(),
      userText: z.string(),
      botResponse: z.string(),
    })).optional(),
  }),
});

export const collections = {
  articles,
  workAreas,
  site,
  chatbot,
};