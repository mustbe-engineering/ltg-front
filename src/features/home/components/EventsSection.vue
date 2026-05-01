<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Calendar, MapPin, Coffee, Sparkles } from 'lucide-vue-next';
import SectionTitle from '../../shared/components/SectionTitle.vue';
import Button from '../../shared/components/Button.vue';
import { getContent } from '../../../services/contentService';
import { formatDate } from '../../../utils/formatters';
import SkeletonLoader from '../../shared/components/SkeletonLoader.vue';
import { useLanguage } from '../../../services/languageService';

const router = useRouter();
const events = ref<any[]>([]);
const loading = ref(true);
const { currentLang } = useLanguage();

async function loadContent() {
  loading.value = true;
  const data = await getContent('events', currentLang.value);
  if (data && data.posts) {
    events.value = data.posts;
  } else {
    events.value = [];
  }
  loading.value = false;
}

onMounted(loadContent);
watch(currentLang, loadContent);

function openEvent(slug: string) {
  router.push({ name: 'event-detail', params: { slug } });
}
</script>

<template>
  <div id="events" class="py-20 container mx-auto px-6 bg-brand-secondary/10 rounded-[3rem] my-12">
    <SectionTitle :icon="Calendar">{{ currentLang === 'es' ? 'Calendario Real' : 'Royal Calendar' }}</SectionTitle>
    
    <div v-if="loading" class="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <SkeletonLoader v-for="i in 4" :key="i" height="h-64" />
    </div>

    <div v-else-if="events.length > 0" class="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <div 
        v-for="event in events" 
        :key="event?.id || Math.random()" 
        class="group relative bg-white rounded-3xl p-8 border transition-all duration-300 hover:shadow-xl"
        :class="[
          event?.highlight 
            ? 'border-brand-primary shadow-brand-primary/20 col-span-1 lg:col-span-2 flex flex-col md:flex-row gap-8 items-center' 
            : 'border-white shadow-sm'
        ]"
      >
        <div v-if="event?.highlight" class="absolute top-0 right-0 bg-brand-primary text-brand-dark text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl">
          {{ currentLang === 'es' ? '¡IMPERDIBLE!' : 'UNMISSABLE!' }}
        </div>
        
        <div :class="[event?.highlight ? 'md:w-1/3' : 'mb-6', 'flex justify-center']">
          <div 
            class="rounded-2xl flex items-center justify-center"
            :class="[event?.highlight ? 'bg-brand-primary/20 w-full h-48' : 'bg-brand-secondary/20 w-16 h-16']"
          >
            <Coffee v-if="event?.highlight" :size="64" class="text-brand-primary" />
            <Sparkles v-else :size="32" class="text-brand-secondary" />
          </div>
        </div>
        
        <div class="flex-1">
          <div v-if="event?.date" class="flex items-center gap-2 text-brand-primary text-sm font-bold uppercase tracking-wide mb-2">
            <Calendar :size="14" /> {{ formatDate(event.date) }}
          </div>
          <h3 class="text-2xl font-serif font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
            {{ event?.title || 'Evento Especial' }}
          </h3>
          <div v-if="event?.location" class="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <MapPin :size="14" /> {{ event.location }}
          </div>
          <p class="text-slate-600 mb-6 leading-relaxed">{{ event?.description || '' }}</p>
          <Button 
            v-if="event?.slug"
            :primary="event.highlight" 
            :class="!event.highlight ? 'w-full' : ''"
            @click="openEvent(event.slug)"
          >
            {{ event.highlight ? (currentLang === 'es' ? "Reservar Cupo" : "Book Your Spot") : (currentLang === 'es' ? "Más Información" : "More Information") }}
          </Button>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-brand-primary/30 max-w-5xl mx-auto w-full">
      <p class="text-slate-400 font-serif italic">{{ currentLang === 'es' ? 'No hay decretos de eventos por el momento.' : 'There are no event decrees at the moment.' }}</p>
    </div>
  </div>
</template>
