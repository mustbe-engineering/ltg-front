<script setup lang="ts">
defineProps<{
  primary?: boolean;
}>();

defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <button 
    @click="$emit('click')"
    class="px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-md flex items-center justify-center gap-2"
    :class="[
      primary 
        ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-dark hover:shadow-brand-primary/50 hover:shadow-lg border border-transparent' 
        : 'bg-white text-brand-dark border-2 border-brand-secondary hover:border-brand-primary hover:bg-brand-surface'
    ]"
  >
    <slot />
  </button>
</template>
