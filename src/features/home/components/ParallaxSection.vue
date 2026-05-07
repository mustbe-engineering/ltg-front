<script setup lang="ts">
import ladiesImage from '@/assets/pictures/ladies.jpg';
</script>

<template>
  <section 
    class="relative h-[400px] md:h-[600px] overflow-hidden flex items-center justify-center bg-center bg-no-repeat bg-cover bg-fixed"
    :style="{ backgroundImage: `url(${ladiesImage})` }"
  >
    <!-- Overlay for better text readability if needed -->
    <div class="absolute inset-0 bg-brand-dark/40"></div>
    
    <div class="relative z-10 text-center px-6">
      <img src="@/assets/logos/ltg-white.svg" alt="LTG Logo" class="mx-auto max-w-[150px] md:max-w-[300px] h-auto drop-shadow-lg" />
    </div>
  </section>
</template>

<style scoped>
/* iOS Safari does not support background-attachment: fixed properly */
@supports (-webkit-touch-callout: none) {
  section {
    background-attachment: scroll !important;
  }
}
</style>
