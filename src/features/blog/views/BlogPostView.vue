<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Calendar, User, ArrowLeft, Clock, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { getContent } from '../../../services/contentService';
import { formatDate } from '../../../utils/formatters';
import SkeletonLoader from '../../shared/components/SkeletonLoader.vue';
import { useLanguage } from '../../../services/languageService';

const route = useRoute();
const router = useRouter();
const post = ref<any>(null);
const loading = ref(true);
const { currentLang } = useLanguage();

const prevPost = ref<any>(null);
const nextPost = ref<any>(null);

async function loadPost() {
  loading.value = true;
  const slug = route.params.slug as string;
  // Standardized to fetch from blog/slug
  post.value = await getContent(`blog/${slug}`, currentLang.value);

  // Fetch all posts to build pagination
  const blogData = await getContent('blog', currentLang.value);
  if (blogData && blogData.posts) {
    const postsList = blogData.posts;
    const sanitizeForCompare = (s: string) => {
      if (!s) return '';
      const clean = decodeURIComponent(s);
      return clean.toLowerCase().replace(/[¿?!¡,.:;()[\]{}"']/g, '').replace(/\s+/g, '-');
    };
    const currentIndex = postsList.findIndex((p: any) => {
      const pSlug = p.slug || p.permalink?.split('/').filter(Boolean).pop() || '';
      return sanitizeForCompare(pSlug) === sanitizeForCompare(slug);
    });
    if (currentIndex !== -1) {
      // In typical blog timeline order:
      // index - 1 is the next/newer post
      // index + 1 is the previous/older post
      nextPost.value = currentIndex > 0 ? postsList[currentIndex - 1] : null;
      prevPost.value = currentIndex < postsList.length - 1 ? postsList[currentIndex + 1] : null;
    } else {
      nextPost.value = null;
      prevPost.value = null;
    }
  }

  loading.value = false;
}

function navigateToPost(slug: string) {
  router.push({ name: 'blog-post', params: { slug } });
}

onMounted(loadPost);
watch([() => route.params.slug, currentLang], loadPost);
</script>

<template>
  <div class="pt-32 pb-20 min-h-screen bg-slate-50">
    <Transition name="fade" mode="out-in">
      <!-- Loading State -->
      <div v-if="loading" key="loading" class="container mx-auto px-6 max-w-4xl">
        <SkeletonLoader height="h-20" class="mb-8" />
        <SkeletonLoader height="h-96" />
      </div>

      <!-- Post Content -->
      <div v-else-if="post" :key="post.slug || 'post'" class="container mx-auto px-6 max-w-4xl">
        <!-- Back Button -->
        <button 
          @click="router.push('/#blog')" 
          class="flex items-center gap-2 text-slate-500 hover:text-pink-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft :size="20" /> {{ currentLang === 'es' ? 'Volver a Crónicas' : 'Back to Chronicles' }}
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
            <div class="flex items-center gap-2">
              <Clock :size="16" /> {{ post?.readTime || (currentLang === 'es' ? '5 minutos' : '5 minutes') }}
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

        <!-- Pagination / Next-Prev Navigation -->
        <div v-if="prevPost || nextPost" class="mt-12 flex flex-col sm:flex-row justify-between items-stretch gap-6 mx-auto w-full">
          <!-- Previous Post Button -->
          <div class="flex-1 flex justify-start">
            <button 
              v-if="prevPost"
              @click="navigateToPost(prevPost.slug)"
              class="w-full bg-white hover:bg-slate-50 border border-slate-100 rounded-full px-8 py-5 flex items-center gap-4 text-left transition-all hover:shadow-md hover:-translate-y-0.5 group cursor-pointer"
            >
              <ChevronLeft class="text-pink-600 shrink-0 group-hover:-translate-x-1 transition-transform" :size="24" />
              <div class="flex-1 min-w-0">
                <span class="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-0.5">
                  {{ currentLang === 'es' ? 'Anterior' : 'Previous' }}
                </span>
                <h4 class="text-sm font-bold text-slate-800 truncate mb-0.5 group-hover:text-pink-600 transition-colors">
                  {{ prevPost.title }}
                </h4>
                <span class="text-xs text-slate-500 block truncate">
                  {{ prevPost.readTime || (currentLang === 'es' ? '5 minutos' : '5 minutes') }} &bull; {{ prevPost.author || 'La Corte' }}
                </span>
              </div>
            </button>
          </div>

          <!-- Next Post Button -->
          <div class="flex-1 flex justify-end">
            <button 
              v-if="nextPost"
              @click="navigateToPost(nextPost.slug)"
              class="w-full bg-white hover:bg-slate-50 border border-slate-100 rounded-full px-8 py-5 flex items-center gap-4 text-right transition-all hover:shadow-md hover:-translate-y-0.5 group cursor-pointer"
            >
              <div class="flex-1 min-w-0">
                <span class="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-0.5">
                  {{ currentLang === 'es' ? 'Siguiente' : 'Next' }}
                </span>
                <h4 class="text-sm font-bold text-slate-800 truncate mb-0.5 group-hover:text-pink-600 transition-colors">
                  {{ nextPost.title }}
                </h4>
                <span class="text-xs text-slate-500 block truncate">
                  {{ nextPost.readTime || (currentLang === 'es' ? '5 minutos' : '5 minutes') }} &bull; {{ nextPost.author || 'La Corte' }}
                </span>
              </div>
              <ChevronRight class="text-pink-600 shrink-0 group-hover:translate-x-1 transition-transform" :size="24" />
            </button>
          </div>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else key="not-found" class="text-center pt-20">
        <h2 class="text-2xl font-serif text-slate-400">Crónica no encontrada...</h2>
        <button @click="router.push({ name: 'blog' })" class="mt-4 text-pink-600 font-bold hover:underline">
          Regresar al Blog
        </button>
      </div>
    </Transition>
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

/* Premium Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
