import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../features/home/views/HomeView.vue'
import EventDetailView from '../features/events/views/EventDetailView.vue'
import BlogPostView from '../features/blog/views/BlogPostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
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
      path: '/events/:slug',
      name: 'event-detail',
      component: EventDetailView
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPostView
    },
    // Redirect old routes to home with hash
    { path: '/events', redirect: '/#events' },
    { path: '/podcast', redirect: '/#podcast' },
    { path: '/blog', redirect: '/#blog' },
    { path: '/manifesto', redirect: '/#manifesto' }
  ]
})

export default router
