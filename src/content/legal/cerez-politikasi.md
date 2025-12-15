---
import LegalLayout from '../layouts/LegalLayout.astro';
import { getEntry, render } from 'astro:content';

const entry = await getEntry('legal', 'cerez-politikasi');

// KESİN KONTROL
if (!entry) {
  throw new Error('Çerez Politikası verisi bulunamadı.');
}

const { Content } = await render(entry);
const { title, description, slug } = entry.data;
---

<LegalLayout
  title={`${title} | Av. Fatih Turan`}
  description={description}
  canonicalUrl={`/${slug || 'cerez-politikasi'}`}
  heroTitle={title}
>
  <Content />
  <hr style="margin:40px 0; border:0; border-top:1px solid var(--color-border);">
  <p><strong>Av. Fatih Turan</strong><br>Ankara Barosu - 46839</p>
</LegalLayout>