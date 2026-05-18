import { useLanguage } from '../services/languageService';

/**
 * Formats a date string into a friendly, localized format.
 * @param dateString ISO date string or date-like string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    // Basic check for common non-date strings
    if (dateString.length < 4) return dateString;
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const { currentLang } = useLanguage();
    const locale = currentLang.value === 'es' ? 'es-ES' : 'en-US';
    
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Removes HTML tags from a string.
 * @param html String containing HTML tags
 * @returns Clean text string
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}
