<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BookOpen, Calendar, ChevronRight } from 'lucide-vue-next';
import SectionTitle from '../../shared/components/SectionTitle.vue';
import { getContent } from '../../../services/contentService';
import { useRouter } from 'vue-router';
import SkeletonLoader from '../../shared/components/SkeletonLoader.vue';

const router = useRouter();
const posts = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  const blogData = await getContent('blog');
  if (blogData && blogData.posts) {
    posts.value = blogData.posts;
  }
  loading.value = false;
});

function readPost(slug: string) {
  router.push({ name: 'blog-post', params: { slug } });
}
</script>

<template>
  <div class="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-pink-50/30">
    <SectionTitle :icon="BookOpen">Crónicas del Reino</SectionTitle>
    
    <div v-if="loading" class="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <SkeletonLoader v-for="i in 6" :key="i" height="h-64" />
    </div>

    <div v-else-if="posts.length > 0" class="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article 
        v-for="post in posts" 
        :key="post?.id || Math.random()"
        class="group bg-white rounded-3xl p-6 border border-purple-100 shadow-lg shadow-purple-50 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
      >
        <div class="mb-4">
          <span class="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wide">
            {{ post?.category || 'Artículo' }}
          </span>
        </div>
        
        <h3 class="text-xl font-serif font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors leading-tight">
          {{ post?.title || 'Sin Título' }}
        </h3>
        
        <p class="text-slate-600 text-sm mb-6 flex-1 leading-relaxed line-clamp-3">
          {{ post?.excerpt || '' }}
        </p>
        
        <div class="flex items-center justify-between pt-4 border-t border-slate-50">
          <div v-if="post?.date" class="flex items-center gap-2 text-xs text-slate-400">
            <Calendar :size="14" />
            {{ post.date }}
          </div>
          <button 
            v-if="post?.slug"
            @click="readPost(post.slug)"
            class="text-pink-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Leer más <ChevronRight :size="16" />
          </button>
        </div>
      </article>
    </div>
    <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-pink-200">
      <p class="text-slate-400 font-serif italic">No se encontraron artículos en la biblioteca real.</p>
    </div>
  </div>
</template>
