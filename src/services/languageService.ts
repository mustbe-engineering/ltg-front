import { ref, watch } from 'vue';

const currentLang = ref<'es' | 'en'>((localStorage.getItem('ltg_lang') as 'es' | 'en') || 'es');

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
