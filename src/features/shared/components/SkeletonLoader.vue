<template>
  <div class="animate-pulse bg-pink-100/50 rounded-3xl w-full" :class="height"></div>
</template>

<script setup lang="ts">
defineProps({
  height: {
    type: String,
    default: 'h-48'
  }
});
</script>
