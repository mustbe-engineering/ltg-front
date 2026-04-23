<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import { 
  Menu, X, Crown, Instagram, Sparkles, Calendar, Headphones, Scroll, BookOpen, Languages 
} from 'lucide-vue-next';
import { useLanguage } from './services/languageService';

const router = useRouter();
const route = useRoute();
const { currentLang, toggleLanguage } = useLanguage();
const isMenuOpen = ref(false);

const navLinks = computed(() => [
  { name: 'home', label: currentLang.value === 'es' ? 'Inicio' : 'Home', icon: Sparkles },
  { name: 'events', label: currentLang.value === 'es' ? 'Eventos' : 'Events', icon: Calendar },
  { name: 'podcast', label: currentLang.value === 'es' ? 'Podcast' : 'Podcast', icon: Headphones },
  { name: 'blog', label: currentLang.value === 'es' ? 'Blog' : 'Blog', icon: BookOpen },
  { name: 'manifesto', label: currentLang.value === 'es' ? 'Manifiesto' : 'Manifesto', icon: Scroll },
]);

function navigateTo(name: string) {
  router.push({ name });
  isMenuOpen.value = false;
}

function isActive(name: string) {
  return route.name === name;
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-pink-200 selection:text-pink-900">
    <!-- Navigation -->
    <nav class="fixed w-full z-50 top-0 left-0 px-4 py-4">
      <div class="bg-white/80 backdrop-blur-lg rounded-full border border-white/40 shadow-lg shadow-purple-100/50 container mx-auto px-6 h-16 flex items-center justify-between">
        
        <!-- Logo -->
        <div class="flex items-center gap-2 cursor-pointer" @click="navigateTo('home')">
          <div class="w-8 h-8 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white shadow-md">
            <Crown :size="16" />
          </div>
          <span class="font-serif font-bold text-lg tracking-tight text-slate-800 hidden sm:block">
            Ladies The Gathering
          </span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center gap-2">
          <button 
            v-for="link in navLinks" 
            :key="link.name"
            @click="navigateTo(link.name)"
            class="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all"
            :class="isActive(link.name) ? 'bg-pink-100 text-pink-700' : 'text-slate-600 hover:bg-white/50 hover:text-pink-600'"
          >
            {{ link.label }}
          </button>
          
          <div class="w-px h-6 bg-slate-200 mx-2"></div>

          <!-- Language Switcher -->
          <button 
            @click="toggleLanguage"
            class="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all border border-slate-200"
          >
            <Languages :size="16" /> {{ currentLang }}
          </button>
          
          <div class="w-px h-6 bg-slate-200 mx-2"></div>
          
          <a href="https://instagram.com/ladiesthegathering" target="_blank" class="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-300">
            <Instagram :size="16" /> Instagram
          </a>
        </div>

        <!-- Mobile Toggle -->
        <button class="lg:hidden text-slate-600 p-2" @click="isMenuOpen = !isMenuOpen">
          <component :is="isMenuOpen ? X : Menu" :size="24" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="lg:hidden absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white flex flex-col gap-2 animate-in slide-in-from-top-4">
        <button 
          v-for="link in navLinks" 
          :key="link.name"
          @click="navigateTo(link.name)"
          class="flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all text-slate-600 hover:bg-pink-50 hover:text-pink-600"
          :class="{ 'bg-pink-50 text-pink-700': isActive(link.name) }"
        >
          <component :is="link.icon" :size="18" />
          {{ link.label }}
        </button>
        
        <hr class="border-slate-100 my-2" />
        
        <a href="https://instagram.com/ladiesthegathering" target="_blank" rel="noreferrer" class="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-center flex items-center justify-center gap-2">
          <Instagram :size="18" /> Instagram
        </a>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="min-h-screen">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-purple-100 pt-16 pb-8">
      <div class="container mx-auto px-6 text-center">
        <div class="flex items-center gap-2 justify-center mb-6">
          <Crown class="text-pink-500" />
          <span class="font-serif font-bold text-2xl text-slate-800">LTG</span>
        </div>
        <p class="text-slate-500 max-w-sm mx-auto mb-8">
          Construyendo un reino donde cada carta jugada es un lazo de amistad fortalecido.
        </p>
        <div class="border-t border-slate-100 pt-8 text-slate-400 text-sm">
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
