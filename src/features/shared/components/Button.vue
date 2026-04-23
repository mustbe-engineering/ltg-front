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
        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-pink-300/50 hover:shadow-lg border border-transparent' 
        : 'bg-white text-purple-700 border-2 border-purple-100 hover:border-purple-300 hover:bg-purple-50'
    ]"
  >
    <slot />
  </button>
</template>
