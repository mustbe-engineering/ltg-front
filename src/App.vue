<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import { 
  Menu, X, Crown, Instagram, Sparkles, Calendar, Headphones, Scroll, BookOpen, Languages 
} from 'lucide-vue-next';
import { useLanguage } from './services/languageService';

const router = useRouter();
const route = useRoute();
const { currentLang, toggleLanguage } = useLanguage();
const isMenuOpen = ref(false);
const activeSection = ref('home');

const navLinks = computed(() => [
  { name: 'home', label: currentLang.value === 'es' ? 'Inicio' : 'Home', icon: Sparkles },
  { name: 'events', label: currentLang.value === 'es' ? 'Eventos' : 'Events', icon: Calendar },
  { name: 'podcast', label: currentLang.value === 'es' ? 'Podcast' : 'Podcast', icon: Headphones },
  { name: 'blog', label: currentLang.value === 'es' ? 'Blog' : 'Blog', icon: BookOpen },
  { name: 'manifesto', label: currentLang.value === 'es' ? 'Manifiesto' : 'Manifesto', icon: Scroll },
]);

// ScrollSpy Logic
onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, observerOptions);

  // Observe all sections
  navLinks.value.forEach((link) => {
    const el = document.getElementById(link.name);
    if (el) observer.observe(el);
  });
});

function navigateTo(name: string) {
  isMenuOpen.value = false;
  
  if (route.name === 'home') {
    const element = document.getElementById(name);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      activeSection.value = name;
      return;
    }
  }
  
  router.push({ name: 'home', hash: `#${name}` });
}

function isActive(name: string) {
  if (route.name !== 'home') return false;
  return activeSection.value === name;
}
</script>

<template>
  <div class="min-h-screen bg-brand-surface font-sans text-brand-dark selection:bg-brand-secondary selection:text-brand-dark">
    <!-- Navigation -->
    <nav class="fixed w-full z-50 top-0 left-0 px-4 py-4">
      <div class="bg-white/90 backdrop-blur-lg rounded-full border border-white/40 shadow-lg shadow-brand-secondary/50 container mx-auto px-6 h-16 flex items-center justify-between">
        
        <!-- Logo -->
        <div class="flex items-center cursor-pointer" @click="navigateTo('home')">
          <img src="@/assets/logos/ltg-logo.svg" alt="Ladies The Gathering" class="h-11 hidden lg:block" />
          <img src="@/assets/logos/ltg-dot.svg" alt="LTG" class="h-11 lg:hidden" />
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center gap-2">
          <button 
            v-for="link in navLinks" 
            :key="link.name"
            @click="navigateTo(link.name)"
            class="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all"
            :class="isActive(link.name) ? 'bg-brand-primary/20 text-brand-dark border-brand-primary' : 'text-slate-600 hover:bg-white/50 hover:text-brand-primary'"
          >
            {{ link.label }}
          </button>
          
          <div class="w-px h-6 bg-brand-secondary/30 mx-2"></div>

          <!-- Language Switcher -->
          <button 
            @click="toggleLanguage"
            class="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest text-brand-dark/60 hover:bg-brand-surface transition-all border border-brand-secondary/30"
          >
            <Languages :size="16" /> {{ currentLang }}
          </button>
          
          <div class="w-px h-6 bg-brand-secondary/30 mx-2"></div>
          
          <a href="https://instagram.com/ladiesthegathering" target="_blank" class="flex items-center gap-2 px-5 py-2 rounded-full bg-brand-dark text-white text-sm font-semibold hover:bg-brand-dark/90 transition-colors shadow-lg shadow-brand-dark/20">
            <Instagram :size="16" /> Instagram
          </a>
        </div>

        <!-- Mobile Toggle -->
        <button class="lg:hidden text-brand-dark p-2" @click="isMenuOpen = !isMenuOpen">
          <component :is="isMenuOpen ? X : Menu" :size="24" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="lg:hidden absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white flex flex-col gap-2 animate-in slide-in-from-top-4">
        <button 
          v-for="link in navLinks" 
          :key="link.name"
          @click="navigateTo(link.name)"
          class="flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all text-slate-600 hover:bg-brand-surface hover:text-brand-primary"
          :class="{ 'bg-brand-surface text-brand-dark': isActive(link.name) }"
        >
          <component :is="link.icon" :size="18" />
          {{ link.label }}
        </button>
        
        <hr class="border-brand-secondary/20 my-2" />
        
        <a href="https://instagram.com/ladiesthegathering" target="_blank" rel="noreferrer" class="w-full py-3 rounded-xl bg-gradient-to-r from-brand-dark to-brand-primary text-white font-bold text-center flex items-center justify-center gap-2">
          <Instagram :size="18" /> Instagram
        </a>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="min-h-screen">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-brand-secondary/30 pt-16 pb-8">
      <div class="container mx-auto px-6 text-center">
        <div class="flex justify-center mb-6">
          <img src="@/assets/logos/ltg-dot-blk.svg" alt="LTG Logo" class="w-52 h-52" />
        </div>
        <p class="text-brand-dark/70 max-w-sm mx-auto mb-8 font-medium">
          Construyendo un reino donde cada carta jugada es un lazo de amistad fortalecido.
        </p>
        <div class="border-t border-brand-secondary/20 pt-8 text-brand-dark/40 text-sm">
          <p>© {{ new Date().getFullYear() }} Ladies The Gathering. Hecho con polvo de hadas y código.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Transiciones de entrada si se quieren agregar manualmente, 
   pero Tailwind animate-in debería funcionar si se configura el plugin */
</style>
