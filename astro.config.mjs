// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://fatihturan.av.tr',

  // Image optimization
  image: {
    // Use Sharp for image processing (default)
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  // Build optimizations
  build: {
    // Inline small assets as base64
    inlineStylesheets: 'auto'
  },

  // Prefetch links on hover for faster navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },

  // Compression and performance
  compressHTML: true,

  // Vite optimizations
  vite: {
    build: {
      // CSS code splitting
      cssCodeSplit: true
    }
  }
});
