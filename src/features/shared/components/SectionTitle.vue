<script setup lang="ts">
import { Crown } from 'lucide-vue-next';
import { type Component } from 'vue';

defineProps<{
  icon?: Component;
}>();
</script>

<template>
  <div class="mb-10 text-center relative z-10">
    <div class="flex justify-center mb-3 text-brand-primary">
      <component :is="icon || Crown" :size="32" />
    </div>
    <h2 class="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4 drop-shadow-sm">
      <slot />
    </h2>
    <div class="h-1 w-24 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary mx-auto rounded-full"></div>
  </div>
</template>
