<script setup lang="ts">
import { Mail, Send } from 'lucide-vue-next';
</script>

<template>
  <section class="py-20 relative overflow-hidden">
    <!-- Background Decorations -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-900 to-slate-900 z-0"></div>
    <div class="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
      <Send :size="300" class="text-white" />
    </div>
    
    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-3xl mx-auto text-center text-white">
        <div class="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 text-pink-300 border border-white/20">
          <Mail :size="24" />
        </div>
        <h2 class="text-3xl md:text-5xl font-serif font-bold mb-4">
          Los Edictos Reales
        </h2>
        <p class="text-purple-200 mb-8 text-lg">
          Suscríbete para recibir noticias de torneos, nuevos episodios del podcast y secretos del reino directamente en tu bandeja de entrada (vía cuervo digital).
        </p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white/10 p-2 rounded-full border border-white/20 backdrop-blur-sm">
          <input 
            type="email" 
            placeholder="tu_correo@reino.com" 
            class="flex-1 bg-transparent border-none text-white placeholder-purple-300 px-6 py-3 focus:outline-none focus:ring-0 rounded-full" 
          />
          <button class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-pink-500/30 transition-all transform hover:scale-105">
            Suscribirse
          </button>
        </div>
        <p class="text-xs text-purple-400 mt-4">
          Prometemos no enviar spam ni hechizos de confusión.
        </p>
      </div>
    </div>
  </section>
</template>
