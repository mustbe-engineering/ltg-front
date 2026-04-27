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
  const cleanSlug = slug.replace(/\/$/, '').replace(/^\//, '');
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
      return await res.json();
    } catch (e) {
      console.error(`[Content] Failed to fetch: ${url}`, e);
    }
  }

  // 3. Fallback to MOCKS in development
  if (isDev) {
    console.log(`[Mock] Serving local mock for: ${slug}`);
    return MOCKS[slug] || null;
  }

  return null;
}
