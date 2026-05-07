import { ref, watch } from 'vue';

const getInitialLanguage = (): 'es' | 'en' => {
  const saved = localStorage.getItem('ltg_lang') as 'es' | 'en';
  if (saved) return saved;
  
  // Detect browser language
  const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';
  if (browserLang === 'es') return 'es';
  
  return 'en'; // Default to English
};

const currentLang = ref<'es' | 'en'>(getInitialLanguage());

watch(currentLang, (newLang) => {
  localStorage.setItem('ltg_lang', newLang);
});

export function useLanguage() {
  const setLanguage = (lang: 'es' | 'en') => {
    currentLang.value = lang;
  };

  const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'es' ? 'en' : 'es';
  };

  return {
    currentLang,
    setLanguage,
    toggleLanguage
  };
}
