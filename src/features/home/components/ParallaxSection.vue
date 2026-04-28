<script setup lang="ts">
import ladiesImage from '@/assets/pictures/ladies.jpg';
</script>

<template>
  <section 
    class="relative h-[400px] md:h-[600px] overflow-hidden flex items-center justify-center"
    :style="{ backgroundImage: `url(${ladiesImage})`, backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }"
  >
    <!-- Overlay for better text readability if needed -->
    <div class="absolute inset-0 bg-brand-dark/40"></div>
    
    <div class="relative z-10 text-center px-6">
      <img src="@/assets/logos/ltg-white.svg" alt="LTG Logo" class="mx-auto max-w-[150px] md:max-w-[300px] h-auto drop-shadow-lg" />
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
