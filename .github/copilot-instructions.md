<!-- Copilot / AI agent instructions for contributors -->
# Copilot Instructions — avukat-web

Purpose: Give AI coding agents the minimal, actionable context to be productive in this Astro site.

- **Quick commands**
  - Dev: `npm run dev` (Astro dev, default localhost:4321)
  - Build: `npm run build` (outputs `dist/`)
  - Preview built site: `npm run preview`

- **Big picture**
  - This is an Astro (v5.x) static site focused on Markdown-driven content. Templates live in `src/layouts`, reusable pieces in `src/components`, and page content in `src/pages` and `src/content`.
  - Data-driven content: structured JSON files under `src/content/data` are the primary source of site-wide data (contact, about, work-areas, chatbot).
  - Articles are Markdown files in `src/content/articles/` — frontmatter fields control metadata and SEO.

- **Important files to reference**
  - [package.json](../package.json#L1) — scripts and deps (use `npm` commands above).
  - [astro.config.mjs](../astro.config.mjs#L1) — image service (`sharp`), prefetch behavior, and build optimizations.
  - [src/content/data/site.json](../src/content/data/site.json#L1) — canonical contact and office data used across components.
  - [src/content/data/chatbot.json](../src/content/data/chatbot.json#L1) — chatbot options and template variables (`{{phone}}`, `{{email}}`, etc.).
  - `src/content/articles/` — Markdown posts; see existing examples like `ise-iade-davasi.md`.

- **Content & naming conventions (concrete rules)**
  - Article filenames: lowercase, hyphen-separated, no Turkish special characters (e.g. `kira-tespit-davasi.md`).
  - Article frontmatter required fields: `title`, `description`, `pubDate`, `heroImage`, `heroAlt`, `tag`, `draft` (optional). Use `pubDate: YYYY-MM-DD`.
  - `heroImage` paths are relative to the Markdown file and typically point to `src/assets/images/` (example frontmatter uses `"heroImage": "../../assets/images/gorsel-adi.jpg"`).
  - Site-wide data files are JSON arrays of objects (see `site.json` and `about.json`) — update the existing object with `id: "main"` rather than creating multiple root objects.

- **Patterns & integrations**
  - Image optimization is handled by Astro's image service (sharp). Prefer adding images to `src/assets/images/` so Astro can optimize them.
  - Chatbot responses use template variables (e.g. `{{phone}}`) replaced from `site.json`. Keep those placeholders intact when editing `chatbot.json`.
  - Legal pages are Markdown under `src/content/legal/` and are directly rendered by `pages/*.astro` routes.

- **Styling & framework choices**
  - Vanilla CSS with `src/styles/global.css` — there is no Tailwind. Keep global styles rather than adding a new CSS framework.

- **Common fixes / gotchas**
  - If content changes don't appear, restart the dev server (`npm run dev`).
  - Ensure JSON files remain valid arrays/objects (the site reads them as JS imports). Watch trailing commas in JSON examples in README — real project files must be valid JSON.
  - For hero images ensure paths are correct and the file exists under `src/assets/images`.

- **When to change code vs content**
  - Content edits: `src/content/**`, `src/assets/images/**`, `src/content/data/**`.
  - Component/layout work: `src/components/**` and `src/layouts/**`. Prefer minimal changes — preserve existing data-driven props and frontmatter keys.

If anything above is unclear or you want the instructions expanded with examples (e.g., a sample article + frontmatter), tell me which part to expand.
