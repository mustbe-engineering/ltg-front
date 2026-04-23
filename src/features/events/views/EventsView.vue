<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Calendar, MapPin, Coffee, Sparkles } from 'lucide-vue-next';
import SectionTitle from '../../shared/components/SectionTitle.vue';
import Button from '../../shared/components/Button.vue';
import { getContent } from '../../../services/contentService';

const router = useRouter();
const events = ref<any[]>([]);

onMounted(async () => {
  const data = await getContent('events');
  if (data && data.posts) {
    events.value = data.posts;
  }
});

function openEvent(slug: string) {
  router.push({ name: 'event-detail', params: { slug } });
}
</script>

<template>
  <div class="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-pink-50/50">
    <SectionTitle :icon="Calendar">Calendario Real</SectionTitle>
    <div v-if="events.length > 0" class="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <div 
        v-for="event in events" 
        :key="event?.id || Math.random()" 
        class="group relative bg-white rounded-3xl p-8 border transition-all duration-300 hover:shadow-xl"
        :class="[
          event?.highlight 
            ? 'border-pink-400 shadow-pink-100 col-span-1 lg:col-span-2 flex flex-col md:flex-row gap-8 items-center' 
            : 'border-white shadow-sm'
        ]"
      >
        <div v-if="event?.highlight" class="absolute top-0 right-0 bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl">
          ¡IMPERDIBLE!
        </div>
        
        <div :class="[event?.highlight ? 'md:w-1/3' : 'mb-6', 'flex justify-center']">
          <div 
            class="rounded-2xl flex items-center justify-center"
            :class="[event?.highlight ? 'bg-pink-100 w-full h-48' : 'bg-purple-50 w-16 h-16']"
          >
            <Coffee v-if="event?.highlight" :size="64" class="text-pink-400" />
            <Sparkles v-else :size="32" class="text-purple-400" />
          </div>
        </div>
        
        <div class="flex-1">
          <div v-if="event?.date" class="flex items-center gap-2 text-pink-500 text-sm font-bold uppercase tracking-wide mb-2">
            <Calendar :size="14" /> {{ event.date }}
          </div>
          <h3 class="text-2xl font-serif font-bold text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">
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
            {{ event.highlight ? "Reservar Cupo" : "Más Información" }}
          </Button>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-pink-200 max-w-5xl mx-auto w-full">
      <p class="text-slate-400 font-serif italic">No hay decretos de eventos por el momento.</p>
    </div>
  </div>
</template>
