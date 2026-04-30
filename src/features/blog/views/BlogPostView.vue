<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-vue-next';
import { getContent } from '../../../services/contentService';
import { formatDate } from '../../../utils/formatters';
import SkeletonLoader from '../../shared/components/SkeletonLoader.vue';

const route = useRoute();
const router = useRouter();
const post = ref<any>(null);
const loading = ref(true);

async function loadPost() {
  loading.value = true;
  const slug = route.params.slug as string;
  // Standardized to fetch from blog/slug
  post.value = await getContent(`blog/${slug}`);
  loading.value = false;
}

onMounted(loadPost);
watch(() => route.params.slug, loadPost);
</script>

<template>
  <div class="pt-32 pb-20 min-h-screen bg-slate-50">
    <div v-if="post" class="container mx-auto px-6 max-w-4xl">
      <!-- Back Button -->
      <button 
        @click="router.push({ name: 'blog' })" 
        class="flex items-center gap-2 text-slate-500 hover:text-pink-600 transition-colors mb-8 font-medium"
      >
        <ArrowLeft :size="20" /> Volver a Crónicas
      </button>

      <!-- Header -->
      <header class="text-center mb-12">
        <div class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-6">
          {{ post?.category || 'Artículo' }}
        </div>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-6 leading-tight">
          {{ post?.title || 'Sin Título' }}
        </h1>
        <div class="flex items-center justify-center gap-6 text-slate-500 text-sm">
          <div v-if="post?.date" class="flex items-center gap-2">
            <Calendar :size="16" /> {{ formatDate(post.date) }}
          </div>
          <div class="flex items-center gap-2">
            <User :size="16" /> {{ post?.author || 'La Corte' }}
          </div>
          <div class="flex items-center gap-2" v-if="post?.readTime">
            <Clock :size="16" /> {{ post.readTime }}
          </div>
        </div>
      </header>

      <!-- Featured Image (Optional) -->
      <div v-if="post.image" class="mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-purple-100 border-4 border-white">
        <img :src="post.image" :alt="post.title" class="w-full h-auto object-cover" />
      </div>

      <!-- Content -->
      <div class="prose prose-lg prose-slate prose-pink mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <div v-html="post.content"></div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="container mx-auto px-6 max-w-4xl">
      <SkeletonLoader height="h-20" class="mb-8" />
      <SkeletonLoader height="h-96" />
    </div>
    
    <!-- Not Found -->
    <div v-else class="text-center pt-20">
      <h2 class="text-2xl font-serif text-slate-400">Crónica no encontrada...</h2>
      <button @click="router.push({ name: 'blog' })" class="mt-4 text-pink-600 font-bold hover:underline">
        Regresar al Blog
      </button>
    </div>
  </div>
</template>

<style>
/* Typography improvements for the article content */
.prose h2 {
  font-family: var(--font-serif);
  color: #1e293b;
  margin-top: 2em;
}
.prose p {
  line-height: 1.8;
  color: #475569;
}
.prose blockquote {
  border-left-color: #ec4899;
  background-color: #fdf2f8;
  padding: 1rem 1.5rem;
  font-style: italic;
  border-radius: 0 0.5rem 0.5rem 0;
}
</style>
