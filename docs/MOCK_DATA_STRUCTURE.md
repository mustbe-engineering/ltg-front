# Mock Data Structure & Hugo Content Definition

This document defines the contract between the Vue.js Frontend and the Hugo CMS backend. It specifies the expected JSON output format and the corresponding Hugo content structure required to generate it.

---

## 🏗 Hugo Content Architecture

To generate the JSONs described below, the Hugo project (`ltg-hugoCms`) should follow this content organization:

```
content/
├── _index.md                # Homepage content
├── blog/
│   ├── _index.md            # Blog list metadata
│   ├── post-1.md            # Individual articles
│   └── post-2.md
├── events/
│   ├── _index.md            # Events list metadata? Or just data file?
│   └── event-1.md           # Individual events (if they have dedicated pages)
├── podcast/
│   └── episode-1.md         # Podcast episodes
└── manifesto/
    └── _index.md            # Manifesto page content
```

> **Note:** Ideally, Hugo should output JSON files at build time using Custom Output Formats.

---

## 1. Global Site Configuration (`/api/global.json`)

**Hugo Source:** `config.toml` or `data/site.json`

```json
{
  "siteTitle": "Ladies The Gathering",
  "description": "Un espacio seguro, inclusivo y encantado...",
  "socials": {
    "instagram": "https://instagram.com/ladiesthegathering",
    "discord": "https://discord.gg/..."
  },
  "footer": {
    "copyright": "© 2026 Ladies The Gathering. Hecho con polvo de hadas y código."
  }
}
```

---

## 2. Home Page (`/api/home.json`)

**Hugo Source:** `content/_index.md` (Frontmatter + Content)

```json
{
  "hero": {
    "badge": "Bienvenida al Reino de Ladies The Gathering",
    "title": "Donde la Magia encuentra su Corte.",
    "description": "Un espacio seguro, inclusivo y encantado...",
    "cta_primary": { "label": "Ver Eventos", "link": "/events" },
    "cta_secondary": { "label": "Escuchar Podcast", "link": "/podcast" }
  },
  "feature_section": {
    "badge": "El Evento Favorito",
    "title": "Commander Tea Party",
    "description": "Olvída la tensión de los torneos oscuros...",
    "cta": { "label": "Reservar mi lugar", "link": "/events" },
    "image_icon": "coffee" // Icon identifier for frontend mapping
  },
  "newsletter": {
    "title": "Los Edictos Reales",
    "description": "Suscríbete para recibir noticias...",
    "placeholder": "tu_correo@reino.com"
  }
}
```

---

## 3. Blog List (`/api/blog.json`)

**Hugo Source:** `content/blog/_index.md` (for title) + Iteration over `content/blog/*.md`

```json
{
  "title": "Crónicas del Reino",
  "description": "Artículos y noticias recientes",
  "posts": [
    {
      "id": "uuid-or-slug",
      "title": "Cómo empezar en Commander",
      "slug": "como-empezar-commander",
      "date": "24 Octubre 2025", // Formatted date string
      "excerpt": "Una guía para princesas guerreras que inician su viaje...",
      "category": "Estrategia",
      "author": "Lady Arwen",
      "image": "/images/blog/commander.jpg"
    }
    // ... more posts
  ]
}
```

---

## 4. Blog Post Detail (`/api/posts/{slug}.json`)

**Hugo Source:** `content/blog/{slug}.md`

```json
{
  "id": "uuid",
  "slug": "como-empezar-commander",
  "title": "Cómo empezar en Commander",
  "date": "24 Octubre 2025",
  "author": "Lady Arwen",
  "category": "Estrategia",
  "readTime": "5 min lectura",
  "image": "/images/blog/commander.jpg",
  "content": "<h1>Introducción</h1><p>El formato Commander es social...</p>..." // Rendered HTML
}
```

---

## 5. Events List (`/api/events.json`)

**Hugo Source:** `content/events/*.md` or `data/events.yaml`

```json
[
  {
    "id": 1,
    "title": "Commander Tea Party: Edición Real",
    "date": "24 Octubre, 16:00",
    "location": "La Guarida del Dragón, CDMX",
    "type": "Evento Insignia",
    "description": "Nuestra reunión clásica...",
    "highlight": true, // Determines if it gets special styling (pink card)
    "icon": "coffee",  // 'coffee', 'sparkles', etc.
    "cta_link": "https://eventbrite..."
  },
  {
    "id": 2,
    "title": "Taller de Encantamientos",
    "date": "05 Noviembre, 11:00",
    "location": "Discord del Reino",
    "type": "Online",
    "description": "Aprende a construir mazos...",
    "highlight": false,
    "icon": "sparkles"
  }
]
```

---

## 6. Podcast List (`/api/podcast.json`)

**Hugo Source:** `content/podcast/*.md` or `data/podcast.yaml`

```json
[
  {
    "id": 104,
    "title": "Ep. 4: Etiqueta en la Mesa de Commander",
    "duration": "45 min",
    "date": "10 Octubre",
    "description": "Discutimos los acuerdos tácitos...",
    "guest": "Lady Arwen",
    "audio_url": "https://spotify...",
    "rss_url": "..."
  }
]
```

---

## 7. Manifesto (`/api/manifesto.json`)

**Hugo Source:** `content/manifesto.md` (Single Page)

```json
{
  "title": "El Manifiesto",
  "quote": "\"En esta mesa, todas portamos corona\"",
  "principles": [
    {
      "number": "I",
      "title": "La Excelencia del Respeto",
      "body": "Declaramos que nuestro espacio es sagrado..."
    },
    {
      "number": "II",
      "title": "Magia sin Barreras",
      "body": "El valor de una jugadora no reside en su colección..."
    }
  ]
}
```
