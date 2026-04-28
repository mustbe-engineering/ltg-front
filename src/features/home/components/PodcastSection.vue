<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Mic, Rss, Play, Headphones } from 'lucide-vue-next';
import SectionTitle from '../../shared/components/SectionTitle.vue';
import { getContent } from '../../../services/contentService';
import { formatDate } from '../../../utils/formatters';
import SkeletonLoader from '../../shared/components/SkeletonLoader.vue';
import { useLanguage } from '../../../services/languageService';

const episodes = ref<any[]>([]);
const loading = ref(true);
const { currentLang } = useLanguage();

async function loadContent() {
  loading.value = true;
  const data = await getContent('podcast', currentLang.value);
  if (data && data.posts) {
    episodes.value = data.posts;
  } else {
    episodes.value = [];
  }
  loading.value = false;
}

onMounted(loadContent);
watch(currentLang, loadContent);
</script>

<template>
  <div id="podcast" class="py-20 container mx-auto px-6">
    <SectionTitle :icon="Mic">La Voz del Reino</SectionTitle>
    <div class="text-center mb-12">
      <p class="text-slate-600 max-w-2xl mx-auto mb-6">
        Escucha las crónicas de nuestras bardas. Entrevistas, consejos de estrategia y chismes de la corte mágica, directo a tus oídos.
      </p>
      <div class="flex justify-center gap-4">
        <button class="flex items-center gap-2 px-6 py-2 rounded-full bg-orange-100 text-orange-600 font-bold hover:bg-orange-200 transition-colors">
          <Rss :size="18" /> Feed RSS
        </button>
        <button class="flex items-center gap-2 px-6 py-2 rounded-full bg-green-100 text-green-700 font-bold hover:bg-green-200 transition-colors">
          <span class="font-serif">Spotify</span>
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="max-w-4xl mx-auto space-y-6">
       <SkeletonLoader v-for="i in 3" :key="i" height="h-32" />
    </div>

    <div v-else-if="episodes.length > 0" class="max-w-4xl mx-auto space-y-6">
      <div 
        v-for="episode in episodes" 
        :key="episode?.id || Math.random()" 
        class="bg-white rounded-3xl p-6 border border-brand-secondary shadow-lg shadow-brand-secondary/10 hover:shadow-xl transition-all flex flex-col md:flex-row gap-6 items-center group"
      >
        <div class="w-24 h-24 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
          <Headphones class="text-white" :size="32" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <div class="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
            <span class="text-xs font-bold text-brand-primary bg-brand-surface px-2 py-1 rounded-md uppercase tracking-wide">Episodio</span>
            <span class="text-xs text-slate-400">
              <span v-if="episode?.date">{{ formatDate(episode.date) }}</span>
              <span v-if="episode?.date && episode?.duration"> • </span>
              <span v-if="episode?.duration">{{ episode.duration }}</span>
            </span>
          </div>
          <h3 class="text-xl font-bold font-serif text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
            {{ episode?.title || 'Episodio Sin Título' }}
          </h3>
          <p class="text-slate-600 text-sm mb-3">
            {{ episode?.description || '' }}
          </p>
          <div v-if="episode?.guest" class="text-xs font-semibold text-brand-secondary">
            Invitada especial: {{ episode.guest }}
          </div>
        </div>
        <button class="w-12 h-12 rounded-full bg-brand-surface flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-brand-dark transition-all shadow-sm group-hover:scale-110">
          <Play :size="20" class="ml-1" />
        </button>
      </div>
    </div>
    <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-brand-primary/30 max-w-4xl mx-auto w-full">
      <p class="text-slate-400 font-serif italic">Las bardas están en silencio por ahora...</p>
    </div>
  </div>
</template>
