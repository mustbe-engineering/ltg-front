<script setup lang="ts">
import { Crown } from 'lucide-vue-next';
import { type Component } from 'vue';

defineProps<{
  icon?: Component;
}>();
</script>

<template>
  <div class="mb-10 text-center relative z-10">
    <div class="flex justify-center mb-3 text-pink-500">
      <component :is="icon || Crown" :size="32" />
    </div>
    <h2 class="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-4 drop-shadow-sm">
      <slot />
    </h2>
    <div class="h-1 w-24 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mx-auto rounded-full"></div>
  </div>
</template>
