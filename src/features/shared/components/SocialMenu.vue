<script setup lang="ts">
import { ref } from 'vue';
import { Instagram, Youtube, Facebook, ChevronDown } from 'lucide-vue-next';

import { useLanguage } from '../../../services/languageService';

defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
});

const isOpen = ref(false);
const { currentLang } = useLanguage();

const networks = [
  { name: 'Instagram', url: 'https://instagram.com/ladiesthegathering', color: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white', icon: Instagram },
  { name: 'Youtube', url: 'https://www.youtube.com/@LadiesTheGathering', color: 'bg-[#FF0000] text-white', icon: Youtube },
  { name: 'Facebook', url: 'https://www.facebook.com/ladiesthegathering', color: 'bg-[#1877F2] text-white', icon: Facebook },
  { name: 'TikTok', url: 'https://www.tiktok.com/@ladiesthegathering', color: 'bg-black text-white border border-white/10', icon: null },
  { name: 'Threads', url: 'https://www.threads.com/@ladiesthegathering', color: 'bg-slate-950 text-white border border-white/10', icon: null }
];

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="relative" :class="isMobile ? 'w-full' : 'inline-block'">
    <button 
      @click="toggleMenu" 
      class="flex items-center justify-center gap-2 px-5 py-3 lg:py-2 rounded-xl lg:rounded-full bg-brand-dark text-white text-sm font-bold lg:font-semibold hover:bg-brand-dark/90 transition-all duration-300 shadow-lg shadow-brand-dark/20 focus:outline-none w-full lg:w-auto"
    >
      <Instagram :size="16" /> 
      <span>{{ currentLang === 'es' ? 'Síguenos' : 'Follow Us' }}</span>
      <ChevronDown :size="16" class="transition-transform duration-300" :class="{ 'rotate-180': isOpen }" />
    </button>

    <div 
      class="absolute left-0 right-0 lg:left-auto lg:right-0 mt-3 z-50 flex flex-col gap-2"
      :class="isOpen ? 'pointer-events-auto' : 'pointer-events-none'"
    >
      <a 
        v-for="(net, index) in networks" 
        :key="net.name"
        :href="net.url"
        target="_blank"
        class="flex items-center justify-center lg:justify-start gap-3 px-5 py-3 lg:py-2 rounded-xl lg:rounded-full text-sm font-bold lg:font-semibold shadow-lg hover:scale-105"
        :class="[net.color]"
        :style="{
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0)',
          opacity: isOpen ? '1' : '0',
          transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 500ms ease',
          transitionDelay: isOpen ? `${index * 80}ms` : `${(networks.length - 1 - index) * 40}ms`
        }"
      >
        <component :is="net.icon" v-if="net.icon" :size="16" />
        <span v-else class="w-4 h-4 flex items-center justify-center text-xs font-black">@</span>
        {{ net.name }}
      </a>
    </div>
  </div>
</template>
