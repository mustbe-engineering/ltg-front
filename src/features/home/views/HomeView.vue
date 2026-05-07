<script setup lang="ts">
import { Calendar, Headphones, Coffee } from 'lucide-vue-next';
import starIcon from '@/assets/logos/star-pointing.svg';
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import Button from '../../shared/components/Button.vue';
import NewsletterSection from '../../shared/components/NewsletterSection.vue';
import EventsSection from '../components/EventsSection.vue';
import PodcastSection from '../components/PodcastSection.vue';
import BlogSection from '../components/BlogSection.vue';
import ManifestoSection from '../components/ManifestoSection.vue';
import SponsorsSection from '../components/SponsorsSection.vue';
import ParallaxSection from '../components/ParallaxSection.vue';
import { useLanguage } from '../../../services/languageService';

const { currentLang } = useLanguage();

const gradientRef = ref<HTMLElement | null>(null);
let gradientCtx: gsap.Context | null = null;

onMounted(() => {
  if (gradientRef.value) {
    gradientCtx = gsap.context(() => {
      // Set initial state
      gsap.set(gradientRef.value, {
        background: "linear-gradient(135deg, #f0ebfc, #be9ffc, #d6d5ff)"
      });

      const tl = gsap.timeline({
        repeat: -1,
        defaults: {
          duration: 5,
          ease: "power1.inOut"
        }
      });

      tl.to(gradientRef.value, {
        background: "linear-gradient(135deg, #be9ffc, #d6d5ff, #11190e)"
      })
      .to(gradientRef.value, {
        background: "linear-gradient(135deg, #d6d5ff, #11190e, #f0ebfc)"
      })
      .to(gradientRef.value, {
        background: "linear-gradient(135deg, #11190e, #f0ebfc, #be9ffc)"
      })
      .to(gradientRef.value, {
        background: "linear-gradient(135deg, #f0ebfc, #be9ffc, #d6d5ff)"
      });
    });
  }
});

onUnmounted(() => {
  if (gradientCtx) gradientCtx.revert();
});

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-dark">
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <iframe 
          src="https://www.youtube.com/embed/5H121GfZs7c?autoplay=1&mute=1&controls=0&loop=1&playlist=5H121GfZs7c&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1&playsinline=1"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] min-w-full h-[56.25vw] min-h-full opacity-60"
          frameborder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
        <!-- Gradient Overlay for readability -->
        <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark/50"></div>
      </div>
      
      <div class="container mx-auto px-6 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-dark/20 border border-brand-primary/30 text-brand-primary text-sm font-bold mb-8 shadow-sm animate-fade-in-up">
          <img :src="starIcon" class="w-4 h-4" alt="Star icon" /> {{ currentLang === 'es' ? 'Bienvenida al Reino de Ladies The Gathering' : 'Welcome to the Kingdom of Ladies The Gathering' }}
        </div>
        <h1 class="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          {{ currentLang === 'es' ? 'Donde la Magia' : 'Where Magic' }} <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">{{ currentLang === 'es' ? 'encuentra su Corte.' : 'finds its Court.' }}</span>
        </h1>
        <p class="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {{ currentLang === 'es' ? 'Un espacio seguro, inclusivo y encantado para mujeres que aman Magic: The Gathering. Aquí, cada jugadora es una reina y cada mazo cuenta una historia.' : 'A safe, inclusive, and enchanted space for women who love Magic: The Gathering. Here, every player is a queen and every deck tells a story.' }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button primary @click="scrollToSection('events')">
            <Calendar :size="18" /> {{ currentLang === 'es' ? 'Ver Eventos' : 'View Events' }}
          </Button>
          <Button @click="scrollToSection('podcast')">
            <Headphones :size="18" /> {{ currentLang === 'es' ? 'Escuchar Podcast' : 'Listen to Podcast' }}
          </Button>
        </div>
      </div>
    </section>

    <!-- Commander Tea Party Feature -->
    <section class="py-20 relative">
      <div class="container mx-auto px-6">
        <div class="bg-gradient-to-r from-brand-secondary to-brand-surface rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-brand-secondary/30 border border-white">
          <div class="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Coffee :size="300" />
          </div>
          <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="inline-block bg-brand-primary text-brand-dark text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                {{ currentLang === 'es' ? 'El Evento Favorito' : 'The Favorite Event' }}
              </div>
              <h2 class="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-6">
                Commander Tea Party
              </h2>
              <p class="text-lg text-slate-700 mb-6 leading-relaxed">
                {{ currentLang === 'es' ? 'Olvída la tensión de los torneos oscuros. Te invitamos a nuestra mesa: un lugar lleno de luz, té, postres y risas. El' : 'Forget the tension of dark tournaments. We invite you to our table: a place full of light, tea, desserts, and laughter. The' }} <strong>Commander Tea Party</strong> {{ currentLang === 'es' ? 'es nuestra celebración de la amistad y la estrategia, donde ganar es secundario y pasarlo bien es la ley del reino.' : 'is our celebration of friendship and strategy, where winning is secondary and having a good time is the law of the kingdom.' }}
              </p>
              <Button primary @click="scrollToSection('events')">{{ currentLang === 'es' ? 'Reservar mi lugar en la mesa' : 'Book my spot at the table' }}</Button>
            </div>
            <div class="hidden md:flex justify-center">
              <div class="w-80 h-96 bg-white rounded-t-full rounded-b-3xl shadow-[0_20px_50px_rgba(190,159,252,0.3)] border-8 border-white flex flex-col items-center justify-center p-6 text-center">
                <div class="mb-4 bg-brand-surface rounded-full p-6 text-brand-primary">
                  <Coffee :size="64" />
                </div>
                <p class="font-serif italic text-slate-500">
                  {{ currentLang === 'es' ? '"No hay mejor manera de resolver un conflicto en la mesa que con una buena taza de té y un Counterspell a tiempo."' : '"There is no better way to resolve a conflict at the table than with a good cup of tea and a timely Counterspell."' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ParallaxSection />
    <EventsSection />
    <NewsletterSection />
    <div class="relative overflow-hidden">
      <div ref="gradientRef" class="absolute inset-0 z-0 opacity-50"></div>
      <div class="relative z-10">
        <PodcastSection />
        <BlogSection />
        <ManifestoSection />
        <SponsorsSection />
      </div>
    </div>
  </div>
</template>
