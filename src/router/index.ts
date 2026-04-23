import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../features/home/views/HomeView.vue'
import EventsView from '../features/events/views/EventsView.vue'
import EventDetailView from '../features/events/views/EventDetailView.vue'
import PodcastView from '../features/podcast/views/PodcastView.vue'
import ManifestoView from '../features/manifesto/views/ManifestoView.vue'
import BlogView from '../features/blog/views/BlogView.vue'
import BlogPostView from '../features/blog/views/BlogPostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView
    },
    {
      path: '/events/:slug',
      name: 'event-detail',
      component: EventDetailView
    },
    {
      path: '/podcast',
      name: 'podcast',
      component: PodcastView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPostView
    },
    {
      path: '/manifesto',
      name: 'manifesto',
      component: ManifestoView
    }
  ]
})

export default router
