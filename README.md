# Av. Fatih Turan - Hukuk Bürosu Web Sitesi

Astro ile geliştirilmiş, içerik odaklı avukat web sitesi.

## Hızlı Başlangıç

### Gereksinimler
- Node.js 18+
- npm veya pnpm

### Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat (localhost:4321)
npm run dev

# Prodüksiyon için derle
npm run build

# Derlenen siteyi önizle
npm run preview
```

---

## Proje Yapısı

```
src/
├── assets/images/          # Makale görselleri (optimize edilir)
├── components/             # Astro bileşenleri
├── content/
│   ├── articles/          # Blog yazıları (Markdown)
│   ├── data/              # Site verileri (JSON)
│   │   ├── site.json      # İletişim ve genel bilgiler
│   │   ├── about.json     # Hakkımda sayfası
│   │   ├── work-areas.json # Çalışma alanları
│   │   └── chatbot.json   # Chatbot ayarları
│   └── legal/             # Yasal sayfalar (Markdown)
├── layouts/               # Sayfa şablonları
├── pages/                 # Sayfalar
└── styles/                # Global CSS

public/
├── images/                # Statik görseller (logo, banner vb.)
└── favicon.ico
```

---

## İçerik Güncelleme Rehberi

### 1. Site Bilgilerini Güncelleme

**Dosya:** `src/content/data/site.json`

```json
[
  {
    "id": "main",
    "name": "Av. Fatih Turan",
    "title": "Hukuki Danışmanlık",
    "contact": {
      "phone": "+90 532 610 08 05",
      "phoneLink": "tel:+905326100805",
      "email": "av.fatihturan@outlook.com",
      "whatsapp": "905326100805",
    },
    "office": {
      "address": "Ankara",
      "note": "Randevu ile çalışmaktayız."
    }
  }
]
```

| Alan | Açıklama |
|------|----------|
| `name` | Avukat adı (header ve footer'da görünür) |
| `title` | Unvan/slogan |
| `contact.phone` | Görüntülenecek telefon numarası |
| `contact.phoneLink` | Tıklanabilir telefon linki (`tel:` ile başlar) |
| `contact.whatsapp` | WhatsApp numarası (ülke kodu ile, boşluksuz) |
| `office.address` | Ofis adresi |
| `office.note` | Adres altı notu |

---

### 2. Hakkımda Sayfasını Güncelleme

**Dosya:** `src/content/data/about.json`

```json
[
  {
    "id": "main",
    "paragraphs": [
      "İlk paragraf metni. <strong>Kalın metin</strong> için HTML kullanabilirsiniz.",
      "İkinci paragraf metni.",
      "Üçüncü paragraf metni."
    ],
    "signature": {
      "name": "Av. Fatih Turan",
      "bar": "Ankara Barosu - 46839"
    }
  }
]
```

- Her paragraf `paragraphs` dizisine ayrı bir eleman olarak eklenir
- HTML etiketleri desteklenir (`<strong>`, `<em>`, `<a href="">` vb.)

---

### 3. Çalışma Alanlarını Güncelleme

**Dosya:** `src/content/data/work-areas.json`

```json
[
  {
    "id": "ceza",
    "icon": "fa-solid fa-gavel",
    "title": "Ceza Hukuku",
    "description": "Bilişim suçları, hakaret, tehdit ve diğer ceza davalarında savunma."
  },
  {
    "id": "is",
    "icon": "fa-solid fa-briefcase",
    "title": "İş Hukuku",
    "description": "İşe iade davaları, kıdem ve ihbar tazminatı."
  }
]
```

**İkon Bulma:**
- [Font Awesome](https://fontawesome.com/icons) sitesinden ikon arayın
- Örnek: `fa-solid fa-scale-balanced`, `fa-solid fa-building`

---

### 4. Chatbot Yanıtlarını Düzenleme

**Dosya:** `src/content/data/chatbot.json`

```json
[
  {
    "id": "main",
    "greeting": "Merhaba! Size nasıl yardımcı olabilirim?",
    "welcomeMessage": "Size nasıl yardımcı olabilirim?",
    "assistantName": "Hukuki Asistan",
    "options": [
      {
        "key": "randevu",
        "label": "Randevu Almak İstiyorum",
        "userText": "Randevu almak istiyorum",
        "botResponse": "Randevu için bizi arayabilirsiniz: {{phone}}",
        "icon": "fa-calendar"
      }
    ]
  }
]
```

**Kullanılabilir Şablon Değişkenleri:**
- `{{phone}}` - Telefon numarası
- `{{email}}` - E-posta adresi
- `{{officeAddress}}` - Ofis adresi
- `{{whatsapp}}` - WhatsApp numarası

---

## Blog Yazısı Ekleme

### Adım 1: Görsel Ekle

Makale için kullanacağınız görseli `src/assets/images/` klasörüne kopyalayın.

**Önerilen boyut:** 1200x630px (16:9 oranı)
**Desteklenen formatlar:** `.jpg`, `.png`, `.webp`

### Adım 2: Markdown Dosyası Oluştur

`src/content/articles/` klasörüne yeni bir `.md` dosyası oluşturun.

**Dosya adı kuralları:**
- Küçük harf kullanın
- Boşluk yerine tire (`-`) kullanın
- Türkçe karakter kullanmayın
- Örnek: `ise-iade-davasi.md`, `kira-tespit-davasi.md`

### Adım 3: İçerik Yazın

```markdown
---
title: "Makale Başlığı"
description: "Makale açıklaması (150-160 karakter, SEO için önemli)"
pubDate: 2024-01-15
heroImage: "../../assets/images/gorsel-adi.jpg"
heroAlt: "Görsel açıklaması (erişilebilirlik için)"
tag: "CEZA HUKUKU"
author: "Av. Fatih Turan"
draft: false
---

Makale içeriği buraya yazılır.

## Alt Başlık

Normal paragraf metni.

### Daha Küçük Başlık

- Madde 1
- Madde 2
- Madde 3

**Kalın metin** ve *italik metin* kullanabilirsiniz.

> Bu bir alıntı bloğudur.

[Link metni](https://example.com)
```

### Frontmatter Alanları

| Alan | Zorunlu | Açıklama |
|------|---------|----------|
| `title` | Evet | Makale başlığı |
| `description` | Evet | SEO açıklaması (150-160 karakter) |
| `pubDate` | Evet | Yayın tarihi (YYYY-MM-DD formatı) |
| `heroImage` | Evet | Kapak görseli yolu |
| `heroAlt` | Evet | Görsel alt metni |
| `tag` | Evet | Kategori etiketi (BÜYÜK HARF) |
| `author` | Hayır | Yazar adı (varsayılan: Av. Fatih Turan) |
| `draft` | Hayır | `true` ise yayınlanmaz |
| `updatedDate` | Hayır | Güncelleme tarihi |

### Örnek Tag'ler

- `CEZA HUKUKU`
- `İŞ HUKUKU`
- `KİRA HUKUKU`
- `ŞİRKETLER HUKUKU`
- `GENEL`

---

## Yasal Sayfaları Düzenleme

**Konum:** `src/content/legal/`

| Dosya | Sayfa |
|-------|-------|
| `kvkk.md` | KVKK Aydınlatma Metni |
| `gizlilik.md` | Gizlilik Bildirimi |
| `cerez.md` | Çerez Politikası |
| `yasal-uyari.md` | Yasal Uyarı |

---

## Logo ve Görselleri Değiştirme

### Logo
- **Dosya:** `src/assets/images/transparent-logo.png`
- **Önerilen boyut:** 200x200px, şeffaf arka plan

### Banner Görseli
- **Dosya:** `public/images/banner.jpg`
- **Önerilen boyut:** 1920x1080px

### Favicon
- **Dosyalar:**
  - `public/favicon.ico`
  - `public/favicon-16.png`
  - `public/favicon-32.png`
  - `public/apple-touch-icon.png`

---

## Deployment

### Netlify / Vercel

1. GitHub'a push edin
2. Netlify/Vercel'de yeni site oluşturun
3. Build komutu: `npm run build`
4. Publish dizini: `dist`

### Manuel Deployment

```bash
npm run build
# dist/ klasörünü sunucunuza yükleyin
```

---

## Sık Sorulan Sorular

### Değişiklikler neden görünmüyor?

1. Geliştirme sunucusunu yeniden başlatın: `npm run dev`
2. Tarayıcı önbelleğini temizleyin (Ctrl+Shift+R)

### Görsel yüklenmiyor?

1. Görsel yolunun doğru olduğundan emin olun
2. `src/assets/images/` içindeki görseller için: `../../assets/images/dosya.jpg`
3. `public/images/` içindeki görseller için: `/images/dosya.jpg`

### Markdown'da Türkçe karakter sorunu?

Dosyayı UTF-8 encoding ile kaydedin.

---

## Teknik Bilgiler

- **Framework:** Astro 5.x
- **Stil:** Vanilla CSS (Tailwind yok)
- **Font:** Montserrat (Google Fonts)
- **İkonlar:** Font Awesome 6
- **Responsive:** 640px, 768px, 900px, 1024px breakpoint'leri

---

## Destek

Teknik sorunlar için: [GitHub Issues](https://github.com/your-repo/issues)
