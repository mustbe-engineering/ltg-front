<script setup lang="ts">
import { Sparkles, Calendar, Headphones, Coffee } from 'lucide-vue-next';
import Button from '../../shared/components/Button.vue';
import NewsletterSection from '../../shared/components/NewsletterSection.vue';
import EventsSection from '../components/EventsSection.vue';
import PodcastSection from '../components/PodcastSection.vue';
import BlogSection from '../components/BlogSection.vue';
import ManifestoSection from '../components/ManifestoSection.vue';
import SponsorsSection from '../components/SponsorsSection.vue';
import ParallaxSection from '../components/ParallaxSection.vue';

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
    <section id="home" class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-surface">
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div class="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-6 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-brand-primary/30 text-brand-primary text-sm font-bold mb-8 shadow-sm animate-fade-in-up">
          <Sparkles :size="16" /> Bienvenida al Reino de Ladies The Gathering
        </div>
        <h1 class="text-5xl md:text-7xl font-serif font-bold text-slate-800 mb-6 leading-tight">
          Donde la Magia <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">encuentra su Corte.</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Un espacio seguro, inclusivo y encantado para mujeres que aman Magic: The Gathering. Aquí, cada jugadora es una reina y cada mazo cuenta una historia.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button primary @click="scrollToSection('events')">
            <Calendar :size="18" /> Ver Eventos
          </Button>
          <Button @click="scrollToSection('podcast')">
            <Headphones :size="18" /> Escuchar Podcast
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
                El Evento Favorito
              </div>
              <h2 class="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-6">
                Commander Tea Party
              </h2>
              <p class="text-lg text-slate-700 mb-6 leading-relaxed">
                Olvída la tensión de los torneos oscuros. Te invitamos a nuestra mesa: un lugar lleno de luz, té, postres y risas. El <strong>Commander Tea Party</strong> es nuestra celebración de la amistad y la estrategia, donde ganar es secundario y pasarlo bien es la ley del reino.
              </p>
              <Button primary @click="scrollToSection('events')">Reservar mi lugar en la mesa</Button>
            </div>
            <div class="hidden md:flex justify-center">
              <div class="w-80 h-96 bg-white rounded-t-full rounded-b-3xl shadow-[0_20px_50px_rgba(190,159,252,0.3)] border-8 border-white flex flex-col items-center justify-center p-6 text-center">
                <div class="mb-4 bg-brand-surface rounded-full p-6 text-brand-primary">
                  <Coffee :size="64" />
                </div>
                <p class="font-serif italic text-slate-500">"No hay mejor manera de resolver un conflicto en la mesa que con una buena taza de té y un Counterspell a tiempo."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ParallaxSection />
    <EventsSection />
    <NewsletterSection />
    <PodcastSection />
    <div class="h-52 bg-brand-dark flex items-center justify-center relative z-10 shadow-inner my-16">
      <img src="@/assets/logos/flames.svg" alt="Flames" class="h-[600px] w-auto object-contain relative top-[20px]" />
    </div>
    <BlogSection />
    <ManifestoSection />
    <SponsorsSection />
  </div>
</template>
