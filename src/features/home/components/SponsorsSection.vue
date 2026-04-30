<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Heart } from 'lucide-vue-next';
import SectionTitle from '../../shared/components/SectionTitle.vue';
import { getContent } from '../../../services/contentService';
import { useLanguage } from '../../../services/languageService';
import { getImageUrl, formatExternalUrl } from '../../../utils/urlHelper';

const sponsors = ref<any[]>([]);
const loading = ref(true);
const { currentLang } = useLanguage();

async function loadContent() {
  loading.value = true;
  const data = await getContent('sponsors', currentLang.value);
  if (data && data.posts) {
    sponsors.value = data.posts;
  } else {
    sponsors.value = [];
  }
  loading.value = false;
}

onMounted(loadContent);
watch(currentLang, loadContent);

function openUrl(url: string) {
  if (url) {
    const formattedUrl = formatExternalUrl(url);
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  }
}
</script>

<template>
  <div id="amistades" class="py-20 container mx-auto px-6">
    <SectionTitle :icon="Heart">Amistades del Reino</SectionTitle>
    
    <div class="text-center mb-12">
      <p class="text-slate-500 max-w-2xl mx-auto italic font-serif">
        Aliadas, gremios y mercaderes que apoyan nuestra causa.
      </p>
    </div>

    <div v-if="loading" class="flex justify-center gap-8 py-10 overflow-hidden">
      <div v-for="i in 3" :key="i" class="w-32 h-20 bg-brand-surface animate-pulse rounded-xl"></div>
    </div>

    <div v-else-if="sponsors.length > 0" class="relative group">
      <!-- Grid / Carousel Container -->
      <div 
        class="flex flex-wrap justify-center items-center gap-12 md:gap-20 py-10"
        :class="{ 'animate-infinite-scroll': sponsors.length > 3 }"
      >
        <div 
          v-for="sponsor in sponsors" 
          :key="sponsor?.id || Math.random()"
          @click="openUrl(sponsor?.external_url)"
          class="group/logo cursor-pointer transition-all duration-500 transform hover:scale-110"
        >
          <div class="w-32 md:w-40 h-24 flex items-center justify-center p-2">
            <img 
              v-if="sponsor?.image"
              :src="getImageUrl(sponsor.image)" 
              :alt="sponsor?.alt || sponsor?.title" 
              class="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500 drop-shadow-sm"
            />
            <span v-else class="text-brand-secondary font-bold text-lg uppercase tracking-tighter">{{ sponsor?.title }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-10">
      <p class="text-brand-secondary text-sm italic">Buscando nuevas alianzas...</p>
    </div>
  </div>
</template>

<style scoped>
/* Basic styles for grayscale to color transition are handled by Tailwind classes in the template */

/* If we wanted a real scrolling carousel for many logos */
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-250px * 5)); }
}
</style>
