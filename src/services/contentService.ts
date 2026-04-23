/**
 * Content Service
 * Fetches content that will eventually come from Hugo-generated JSONs.
 */

// Mock data simulating Hugo's output structure
const MOCKS: Record<string, any> = {
  home: {
    title: "Ladies The Gathering",
    hero: {
      badge: "Edición Real",
      title: "En esta mesa, todas portamos corona",
      description: "La comunidad más grande de Magic: The Gathering para mujeres y personas no binarias en México."
    },
    feature_section: {
      badge: "Comunidad",
      title: "Un Espacio Seguro",
      description: "Jugamos para crear recuerdos, celebrar la estrategia y construir amistades duraderas."
    }
  },
  events: {
    title: "Eventos",
    posts: [
      { id: "1", title: "Commander Tea Party: Edición Real", date: "2026-10-24T16:00:00Z", location: "La Guarida del Dragón, CDMX", type: "Evento Insignia", description: "Nuestra reunión clásica. Trae tu taza de té favorita.", highlight: true, permalink: "/events/tea-party/" },
      { id: "2", title: "Taller de Encantamientos", date: "2026-11-05T11:00:00Z", location: "Discord del Reino", type: "Online", description: "Aprende a construir mazos de auras.", highlight: false, permalink: "/events/taller/" }
    ]
  },
  podcast: {
    title: "Podcast",
    posts: [
      { id: "104", title: "Ep. 4: Etiqueta en la Mesa", duration: "45 min", date: "2026-10-10T12:00:00Z", description: "Discutimos los acuerdos tácitos.", guest: "Lady Arwen", permalink: "/podcast/ep4/" }
    ]
  },
  blog: {
    title: "Latest Articles",
    posts: [
      { id: "1", title: "Getting Started with Vue & Hugo", slug: "getting-started", date: "2026-02-05T00:00:00Z", excerpt: "How to integrate Vue.js with a headless Hugo CMS.", permalink: "/blog/getting-started/" }
    ]
  },
  "blog/getting-started": {
    title: "Getting Started with Vue & Hugo",
    date: "2026-02-05T00:00:00Z",
    content: "<p>This is the full content of the article.</p>",
    permalink: "/blog/getting-started/"
  },
  manifesto: {
    title: "El Manifiesto de la Comunidad",
    quote: "\"En esta mesa, todas portamos corona\"",
    principles: [
      {
        number: "I",
        title: "La Excelencia del Respeto",
        body: "Declaramos que nuestro espacio es sagrado."
      }
    ],
    footer_text: "Sellado y decretado por la comunidad."
  }
};

export async function getContent(slug: string): Promise<any> {
  const isDev = import.meta.env.DEV;
  
  if (isDev && !import.meta.env.VITE_CMS_API_URL) {
    console.log(`[Mock] Fetching: ${slug}`);
    return MOCKS[slug] || null;
  }
  
  try {
    // Hugo produces a nested index.json for every path
    const url = `${import.meta.env.VITE_CMS_API_URL}/${slug.replace(/\/$/, '')}/index.json`.replace(/\/+/g, '/').replace(':/', '://');
    
    console.log(`[Content] Fetching: ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error(`Failed to fetch content for ${slug}`, e);
    return isDev ? MOCKS[slug] || null : null;
  }
}
