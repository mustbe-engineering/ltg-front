<script setup lang="ts">
// Parallax Section Component
</script>

<template>
  <section 
    class="relative h-[400px] md:h-[600px] overflow-hidden flex items-center justify-center"
    style="background-image: url('/assets/parallax-bg.png'); background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover;"
  >
    <!-- Overlay for better text readability if needed -->
    <div class="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"></div>
    
    <div class="relative z-10 text-center px-6">
      <h2 class="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
        La Magia en tus Manos
      </h2>
      <p class="text-xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow-md">
        Cada carta es un portal, cada partida una nueva leyenda.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* Ensure smooth parallax on mobile if possible, 
   though background-attachment: fixed has limited support on iOS.
   For a more robust version, a JS-based parallax could be used. */
@media (max-width: 768px) {
  section {
    background-attachment: scroll; /* Fallback for mobile performance */
  }
}
</style>
