import type { CollectionEntry } from 'astro:content';

// YYYY-MM-DD biçiminde, Europe/Istanbul saat dilimine göre tarih üretir.
const istanbulDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Istanbul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/**
 * Bir makalenin yayında sayılıp sayılmadığını belirler.
 * Koşul: taslak (draft) değil VE yayın tarihi (pubDate) Türkiye takvimine göre
 * bugüne veya geçmişe ait.
 *
 * Karşılaştırma UTC anı yerine takvim GÜNÜ üzerinden (Europe/Istanbul) yapılır;
 * böylece "bugün" tarihli bir makale, saat dilimi kayması nedeniyle gizlenmez.
 * İleri tarihli makaleler o gün gelene kadar gizli kalır; günlük yeniden build
 * ile tarih geldiğinde otomatik yayınlanır.
 *
 * getCollection('articles', isPublished) filtresi olarak veya
 * bir dizi üzerinde .filter(isPublished) şeklinde kullanılabilir.
 */
export function isPublished(entry: CollectionEntry<'articles'>): boolean {
  if (entry.data.draft) return false;
  const today = istanbulDate.format(new Date());
  const pub = istanbulDate.format(entry.data.pubDate);
  return pub <= today; // YYYY-MM-DD sözlüksel karşılaştırma = tarih karşılaştırması
}
