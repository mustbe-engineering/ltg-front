import { MOCKS } from './contentMocks';

/**
 * Content Service
 * Standardized fetching logic for Headless Hugo CMS.
 */
const CMS_URL = import.meta.env.VITE_CMS_API_URL || '';

export async function getContent(slug: string): Promise<any> {
  const isDev = import.meta.env.DEV;
  
  // 1. Clean up the slug and build the index.json path
  const cleanSlug = slug.replace(/\/$/, '').replace(/^\//, '');
  const apiPath = cleanSlug === '' || cleanSlug === 'home' ? '/index.json' : `/${cleanSlug}/index.json`;
  const url = `${CMS_URL}${apiPath}`.replace(/\/+/g, '/').replace(':/', '://');

  // 2. Attempt production fetch
  if (CMS_URL) {
    try {
      console.log(`[Content] Fetching: ${url}`);
      const res = await fetch(url);
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
