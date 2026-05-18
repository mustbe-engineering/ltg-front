import { MOCKS } from './contentMocks';

/**
 * Content Service
 * Standardized fetching logic for Headless Hugo CMS.
 */
const CMS_URL = import.meta.env.VITE_CMS_API_URL || '';

/**
 * Fetches content from the CMS API.
 * @param slug - The content identifier (e.g., 'blog', 'events', 'manifesto')
 * @param lang - The language code ('es' or 'en')
 */
export async function getContent(slug: string, lang: string = 'es'): Promise<any> {
  const isDev = import.meta.env.DEV;
  
  // 1. Clean up the slug and build the index.json path
  const rawCleanSlug = slug.replace(/\/$/, '').replace(/^\//, '');
  const cleanSlug = sanitizeHugoSlug(rawCleanSlug);
  const langPath = lang === 'es' ? '' : `/${lang}`;
  const apiPath = cleanSlug === '' || cleanSlug === 'home' ? `${langPath}/index.json` : `${langPath}/${cleanSlug}/index.json`;
  const url = `${CMS_URL}${apiPath}`.replace(/\/+/g, '/').replace(':/', '://');

  // 2. Attempt production fetch
  if (CMS_URL) {
    try {
      // Append a timestamp to prevent aggressive browser caching of the static JSON file
      const cacheBustedUrl = isDev ? `${url}?t=${Date.now()}` : url;
      console.log(`[Content] Fetching: ${cacheBustedUrl}`);
      const res = await fetch(cacheBustedUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      return processContent(data);
    } catch (e) {
      console.error(`[Content] Failed to fetch: ${url}`, e);
    }
  }

  // 3. Fallback to MOCKS in development
  if (isDev) {
    console.log(`[Mock] Serving local mock for: ${slug}`);
    return MOCKS[slug] || MOCKS[cleanSlug] || null;
  }

  return null;
}

/**
 * Replicates Hugo's default slugification rules to match physical output files.
 */
function sanitizeHugoSlug(slug: string): string {
  if (!slug) return '';
  return slug
    .split('/')
    .map(segment => {
      if (!segment || segment === 'blog' || segment === 'events' || segment === 'podcast') return segment;
      
      let clean = decodeURIComponent(segment);
      clean = clean
        .replace(/[¿?!¡,.:;()[\]{}"']/g, '') // remove punctuation
        .replace(/\s+/g, '-')                // spaces to hyphens
        .toLowerCase();                      // lowercase
        
      return clean;
    })
    .join('/');
}

/**
 * Processes content to fix relative paths and other CMS-specific formatting.
 */
function processContent(data: any): any {
  if (!data || !CMS_URL) return data;

  const baseUrl = CMS_URL.replace(/\/$/, '');

  // Recursive function to walk through the object and fix paths
  const traverse = (obj: any): any => {
    if (typeof obj === 'string') {
      // Fix image sources in HTML content (src="/images/...")
      return obj.replace(/src="\/images\//g, `src="${baseUrl}/images/`)
                .replace(/src="\/uploads\//g, `src="${baseUrl}/uploads/`);
    }
    if (Array.isArray(obj)) {
      return obj.map(traverse);
    }
    if (obj !== null && typeof obj === 'object') {
      const newObj: any = {};
      for (const key in obj) {
        // Fix standalone image fields that start with /
        if (typeof obj[key] === 'string' && obj[key].startsWith('/') && (key === 'image' || key === 'cover' || key === 'avatar')) {
          newObj[key] = `${baseUrl}${obj[key]}`;
        } else {
          newObj[key] = traverse(obj[key]);
        }
      }
      return newObj;
    }
    return obj;
  };

  return traverse(data);
}
