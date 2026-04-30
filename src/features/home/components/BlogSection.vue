<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Calendar, ChevronRight } from 'lucide-vue-next';
import SectionTitle from '../../shared/components/SectionTitle.vue';
import starIcon from '../../../assets/logos/star.svg';
import { getContent } from '../../../services/contentService';
import { formatDate } from '../../../utils/formatters';
import { useRouter } from 'vue-router';
import SkeletonLoader from '../../shared/components/SkeletonLoader.vue';
import { useLanguage } from '../../../services/languageService';

const router = useRouter();
const posts = ref<any[]>([]);
const loading = ref(true);
const { currentLang } = useLanguage();

async function loadContent() {
  loading.value = true;
  const blogData = await getContent('blog', currentLang.value);
  if (blogData && blogData.posts) {
    posts.value = blogData.posts;
  } else {
    posts.value = [];
  }
  loading.value = false;
}

onMounted(loadContent);
watch(currentLang, loadContent);

function readPost(slug: string) {
  router.push({ name: 'blog-post', params: { slug } });
}
</script>

<template>
  <div id="blog" class="py-20 container mx-auto px-6 bg-brand-secondary/10 rounded-[3rem] my-12">
    <SectionTitle :icon="starIcon">Crónicas del Reino</SectionTitle>
    
    <div v-if="loading" class="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <SkeletonLoader v-for="i in 6" :key="i" height="h-64" />
    </div>

    <div v-else-if="posts.length > 0" class="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article 
        v-for="post in posts" 
        :key="post?.id || Math.random()"
        class="group bg-white rounded-3xl p-6 border border-brand-secondary shadow-lg shadow-brand-secondary/10 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
      >
        <div class="mb-4">
          <span class="inline-block px-3 py-1 rounded-full bg-brand-primary/20 text-brand-dark text-xs font-bold uppercase tracking-wide">
            {{ post?.category || 'Artículo' }}
          </span>
        </div>
        
        <h3 class="text-xl font-serif font-bold text-brand-dark mb-3 group-hover:text-brand-primary transition-colors leading-tight">
          {{ post?.title || 'Sin Título' }}
        </h3>
        
        <p class="text-slate-600 text-sm mb-6 flex-1 leading-relaxed line-clamp-3">
          {{ post?.excerpt || '' }}
        </p>
        
        <div class="flex items-center justify-between pt-4 border-t border-slate-50">
          <div v-if="post?.date" class="flex items-center gap-2 text-xs text-slate-400">
            <Calendar :size="14" />
            {{ formatDate(post.date) }}
          </div>
          <button 
            v-if="post?.slug"
            @click="readPost(post.slug)"
            class="text-brand-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Leer más <ChevronRight :size="16" />
          </button>
        </div>
      </article>
    </div>
    <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-brand-primary/30">
      <p class="text-slate-400 font-serif italic">No se encontraron artículos en la biblioteca real.</p>
    </div>
  </div>
</template>
