/**
 * URL Helper Utilities
 */

const CMS_URL = import.meta.env.VITE_CMS_API_URL || '';

/**
 * Resolves an image path from the CMS.
 * Prepends the CMS_URL if the path is relative.
 */
export function getImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  // Ensure we don't double slash
  const cleanBase = CMS_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${cleanBase}${cleanPath}`;
}

/**
 * Formats an external URL to ensure it has a protocol.
 * Defaults to https:// if missing.
 */
export function formatExternalUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}
