<script setup lang="ts">
import { Instagram, Youtube, Facebook, Calendar, Headphones, BookOpen, Home, ChevronRight } from 'lucide-vue-next';
import { useLanguage } from '../../../services/languageService';
import logoBlk from '@/assets/logos/ltg-dot-blk.svg';
import ladiesBg from '@/assets/pictures/ladies.jpg';

const { currentLang } = useLanguage();

const mainLinks = [
  { 
    name: currentLang.value === 'es' ? 'Página Principal' : 'Home', 
    url: '/', 
    icon: Home 
  },
  { 
    name: currentLang.value === 'es' ? 'Próximos Eventos' : 'Upcoming Events', 
    url: '/#events', 
    icon: Calendar 
  },
  { 
    name: currentLang.value === 'es' ? 'Nuestro Podcast' : 'Our Podcast', 
    url: '/#podcast', 
    icon: Headphones 
  },
  { 
    name: currentLang.value === 'es' ? 'Blog & Noticias' : 'Blog & News', 
    url: '/#blog', 
    icon: BookOpen 
  }
];

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/ladiesthegathering', icon: Instagram, color: 'hover:text-[#E4405F]' },
  { name: 'Youtube', url: 'https://www.youtube.com/@LadiesTheGathering', icon: Youtube, color: 'hover:text-[#FF0000]' },
  { name: 'Facebook', url: 'https://www.facebook.com/ladiesthegathering', icon: Facebook, color: 'hover:text-[#1877F2]' }
];
</script>

<template>
  <div class="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden bg-brand-dark">
    <!-- Background Image with Blur -->
    <div 
      class="absolute inset-0 z-0 bg-cover bg-center scale-110"
      :style="{ backgroundImage: `url(${ladiesBg})`, filter: 'blur(10px) brightness(0.3)' }"
    ></div>

    <!-- Main Content -->
    <div class="relative z-10 w-full max-w-md flex flex-col items-center text-center">
      <!-- Profile Header -->
      <div class="mb-8 animate-fade-in">
        <div class="w-24 h-24 rounded-full bg-white p-4 shadow-2xl mb-4 mx-auto border-4 border-brand-primary/20">
          <img :src="logoBlk" alt="LTG Logo" class="w-full h-full object-contain" />
        </div>
        <h1 class="text-3xl font-serif font-bold text-white mb-2">Ladies The Gathering</h1>
        <p class="text-brand-primary font-medium tracking-wide">
          {{ currentLang === 'es' ? 'Donde la Magia encuentra su Corte' : 'Where Magic finds its Court' }}
        </p>
      </div>

      <!-- Links List -->
      <div class="w-full flex flex-col gap-4 mb-12">
        <a 
          v-for="(link, index) in mainLinks" 
          :key="index"
          :href="link.url"
          class="group flex items-center justify-between p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:bg-white/20 hover:border-brand-primary/50 hover:translate-y-[-2px] shadow-xl"
        >
          <div class="flex items-center gap-4">
            <div class="p-2 rounded-xl bg-brand-primary/20 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
              <component :is="link.icon" :size="20" />
            </div>
            <span class="font-bold text-lg">{{ link.name }}</span>
          </div>
          <ChevronRight :size="20" class="text-white/40 group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-300" />
        </a>
      </div>

      <!-- Social Networks -->
      <div class="flex gap-8 items-center justify-center">
        <a 
          v-for="social in socialLinks" 
          :key="social.name"
          :href="social.url"
          target="_blank"
          class="text-white/60 transition-all duration-300 hover:scale-125"
          :class="social.color"
        >
          <component :is="social.icon" :size="28" />
        </a>
      </div>

      <!-- Footer -->
      <div class="mt-16 text-white/30 text-sm font-medium">
        © {{ new Date().getFullYear() }} Ladies The Gathering
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
