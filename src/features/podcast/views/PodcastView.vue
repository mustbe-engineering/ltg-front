<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Mic, Rss, Play, Headphones } from 'lucide-vue-next';
import SectionTitle from '../../shared/components/SectionTitle.vue';
import { getContent } from '../../../services/contentService';

const episodes = ref<any[]>([]);

onMounted(async () => {
  const data = await getContent('podcast');
  if (data && data.posts) {
    episodes.value = data.posts;
  }
});
</script>

<template>
  <div class="pt-32 pb-20 container mx-auto px-6 min-h-screen">
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
    
    <div v-if="episodes.length > 0" class="max-w-4xl mx-auto space-y-6">
      <div 
        v-for="episode in episodes" 
        :key="episode?.id || Math.random()" 
        class="bg-white rounded-3xl p-6 border border-purple-100 shadow-lg shadow-purple-50 hover:shadow-xl transition-all flex flex-col md:flex-row gap-6 items-center group"
      >
        <div class="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
          <Headphones class="text-white" :size="32" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <div class="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
            <span class="text-xs font-bold text-pink-500 bg-pink-50 px-2 py-1 rounded-md uppercase tracking-wide">Episodio</span>
            <span class="text-xs text-slate-400">
              <span v-if="episode?.date">{{ episode.date }}</span>
              <span v-if="episode?.date && episode?.duration"> • </span>
              <span v-if="episode?.duration">{{ episode.duration }}</span>
            </span>
          </div>
          <h3 class="text-xl font-bold font-serif text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
            {{ episode?.title || 'Episodio Sin Título' }}
          </h3>
          <p class="text-slate-600 text-sm mb-3">
            {{ episode?.description || '' }}
          </p>
          <div v-if="episode?.guest" class="text-xs font-semibold text-purple-400">
            Invitada especial: {{ episode.guest }}
          </div>
        </div>
        <button class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-pink-500 hover:text-white transition-all shadow-sm group-hover:scale-110">
          <Play :size="20" class="ml-1" />
        </button>
      </div>
    </div>
    <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-pink-200 max-w-4xl mx-auto w-full">
      <p class="text-slate-400 font-serif italic">Las bardas están en silencio por ahora...</p>
    </div>
  </div>
</template>
