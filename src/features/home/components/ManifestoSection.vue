<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Scroll } from 'lucide-vue-next';
import SectionTitle from '../../shared/components/SectionTitle.vue';
import { getContent } from '../../../services/contentService';
import SkeletonLoader from '../../shared/components/SkeletonLoader.vue';
import { useLanguage } from '../../../services/languageService';

const manifesto = ref<any>(null);
const loading = ref(true);
const { currentLang } = useLanguage();

async function loadContent() {
  loading.value = true;
  manifesto.value = await getContent('manifesto', currentLang.value);
  loading.value = false;
}

onMounted(loadContent);
watch(currentLang, loadContent);
</script>

<template>
  <div id="manifesto" class="py-20 container mx-auto px-6 relative overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-30 pointer-events-none" style="background-image: radial-gradient(#be9ffc 1px, transparent 1px); background-size: 30px 30px;"></div>
    
    <div v-if="loading" class="max-w-4xl mx-auto relative z-10">
      <SkeletonLoader height="h-[600px]" />
    </div>

    <div class="max-w-4xl mx-auto relative z-10" v-else-if="manifesto">
      <SectionTitle :icon="Scroll">{{ manifesto?.title || 'El Manifiesto' }}</SectionTitle>
      <div class="bg-white p-8 md:p-12 rounded shadow-2xl border-t-8 border-b-8 border-brand-primary relative">
        <div class="absolute top-4 left-4 text-brand-secondary">
          <img src="@/assets/logos/flame.svg" alt="Flame" class="w-20 h-20 object-contain -scale-y-100 rotate-180" />
        </div>
        <div class="absolute bottom-4 right-4 text-brand-secondary">
          <img src="@/assets/logos/flame.svg" alt="Flame" class="w-20 h-20 object-contain" />
        </div>
        <h3 v-if="manifesto?.quote" class="text-3xl font-serif text-center text-brand-dark italic mb-8">
          {{ manifesto.quote }}
        </h3>
        <div v-if="manifesto?.principles?.length" class="space-y-12 pt-[84px] pb-[24px]">
          <div v-for="(principle, index) in manifesto.principles" :key="index" class="flex gap-6">
            <div class="text-5xl font-serif text-brand-primary font-bold opacity-50">{{ principle?.number ? principle.number : (Number(index) + 1) }}.</div>
            <div>
              <h4 class="text-xl font-bold text-slate-800 mb-2 uppercase tracking-wide">{{ principle?.title || 'Principio' }}</h4>
              <p class="text-slate-700 leading-relaxed text-lg">
                {{ principle?.body || '' }}
              </p>
            </div>
          </div>
          <img src="@/assets/logos/logo-full.svg" alt="Flame" class="w-124 h-124 object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none" />
        </div>
        <div v-if="manifesto?.footer_text" class="mt-8 pt-8 border-t border-brand-secondary text-center">
          <p class="font-serif italic text-slate-500">{{ manifesto.footer_text }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center pt-20">
      <p>Cargando los decretos reales...</p>
    </div>
  </div>
</template>
