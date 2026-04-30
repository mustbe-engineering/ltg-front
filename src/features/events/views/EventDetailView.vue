<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Calendar, MapPin, ArrowLeft, ExternalLink } from 'lucide-vue-next';
import { getContent } from '../../../services/contentService';
import { formatDate } from '../../../utils/formatters';
import Button from '../../shared/components/Button.vue';

const route = useRoute();
const router = useRouter();
const event = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  const slug = route.params.slug as string;
  // Fetch specific event data (assuming Hugo outputs /events/slug/index.json or similar)
  // Or we fetch the list and find it if individual JSONs aren't generated.
  // Ideally: await getContent(`events/${slug}`);
  
  // For now, let's try fetching the specific event content
  event.value = await getContent(`events/${slug}`);
  loading.value = false;
});
</script>

<template>
  <div class="pt-32 pb-20 min-h-screen bg-pink-50/30">
    <div v-if="event" class="container mx-auto px-6 max-w-4xl">
      
      <!-- Back -->
      <button @click="router.push({ name: 'home' })" class="flex items-center gap-2 text-slate-500 hover:text-pink-600 mb-8 font-medium">
        <ArrowLeft :size="20" /> Volver al Calendario
      </button>

      <div class="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-white">
        <!-- Hero / Header inside card -->
        <div class="bg-brand-dark p-8 md:p-12 text-white relative overflow-hidden">
          <div class="relative z-10">
            <div class="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 border border-white/30">
              {{ event.type || 'Evento Especial' }}
            </div>
            <h1 class="text-3xl md:text-5xl font-serif font-bold mb-6">{{ event.title }}</h1>
            
            <div class="flex flex-col md:flex-row gap-6 text-pink-100 font-medium">
              <div class="flex items-center gap-2">
                <Calendar :size="20" /> {{ formatDate(event.date) }}
              </div>
              <div class="flex items-center gap-2">
                <MapPin :size="20" /> {{ event.location }}
              </div>
            </div>
          </div>
          
          <!-- Decor -->
          <div class="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div class="p-8 md:p-12">
          <!-- Content -->
          <div class="prose prose-lg prose-slate prose-pink mb-10">
            <p class="lead text-xl text-slate-600">{{ event.description }}</p>
            <div v-html="event.content"></div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
            <Button primary v-if="event.cta_link" @click="() => {}">
              <a :href="event.cta_link" target="_blank" class="flex items-center gap-2 text-white no-underline">
                Reservar Entrada <ExternalLink :size="18" />
              </a>
            </Button>
            <Button v-else primary>
              Registro Próximamente
            </Button>
          </div>
        </div>
      </div>

    </div>
    
    <div v-else-if="loading" class="flex justify-center pt-20">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500"></div>
    </div>
    
    <div v-else class="text-center pt-20">
      <h2 class="text-2xl text-slate-400">Evento no encontrado</h2>
    </div>
  </div>
</template>
