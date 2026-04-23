<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Scroll, Crown, Sparkles } from 'lucide-vue-next';
import SectionTitle from '../../shared/components/SectionTitle.vue';
import { getContent } from '../../../services/contentService';
import SkeletonLoader from '../../shared/components/SkeletonLoader.vue';

const manifesto = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  manifesto.value = await getContent('manifesto');
  loading.value = false;
});
</script>

<template>
  <div class="pt-32 pb-20 container mx-auto px-6 min-h-screen relative overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-30 pointer-events-none" style="background-image: radial-gradient(#f0abfc 1px, transparent 1px); background-size: 30px 30px;"></div>
    
    <div v-if="loading" class="max-w-4xl mx-auto relative z-10">
      <SkeletonLoader height="h-[600px]" />
    </div>

    <div class="max-w-4xl mx-auto relative z-10" v-else-if="manifesto">
      <SectionTitle :icon="Scroll">{{ manifesto?.title || 'El Manifiesto' }}</SectionTitle>
      <div class="bg-[#fffbf0] p-8 md:p-12 rounded shadow-2xl border-t-8 border-b-8 border-pink-300 relative">
        <div class="absolute top-4 left-4 text-pink-200">
          <Crown :size="40" />
        </div>
        <div class="absolute bottom-4 right-4 text-pink-200">
          <Sparkles :size="40" />
        </div>
        <h3 v-if="manifesto?.quote" class="text-3xl font-serif text-center text-slate-800 italic mb-10">
          {{ manifesto.quote }}
        </h3>
        <div v-if="manifesto?.principles?.length" class="space-y-12">
          <div v-for="(principle, index) in manifesto.principles" :key="index" class="flex gap-6">
            <div class="text-5xl font-serif text-pink-300 font-bold opacity-50">{{ principle?.number ? principle.number : (Number(index) + 1) }}.</div>
            <div>
              <h4 class="text-xl font-bold text-slate-800 mb-2 uppercase tracking-wide">{{ principle?.title || 'Principio' }}</h4>
              <p class="text-slate-700 leading-relaxed text-lg">
                {{ principle?.body || '' }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="manifesto?.footer_text" class="mt-12 pt-8 border-t border-pink-200 text-center">
          <p class="font-serif italic text-slate-500">{{ manifesto.footer_text }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center pt-20">
      <p>Cargando los decretos reales...</p>
    </div>
  </div>
</template>
