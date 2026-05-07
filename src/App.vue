<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import { 
  Sparkles, Calendar, Headphones, Scroll, BookOpen, Languages 
} from 'lucide-vue-next';
import { useLanguage } from './services/languageService';
import SocialMenu from './features/shared/components/SocialMenu.vue';

const router = useRouter();
const route = useRoute();
const { currentLang, toggleLanguage } = useLanguage();
const isMenuOpen = ref(false);
const activeSection = ref('home');

import LanguageTransition from './features/shared/components/LanguageTransition.vue';

const isLanguageTransitioning = ref(false);
const transitionRef = ref<any>(null);

function triggerLanguageTransition() {
  transitionRef.value?.play();
}

function handleLanguageChange() {
  toggleLanguage();
}

function handleLanguageTransitionFinish() {
  isLanguageTransitioning.value = false;
}

const navLinks = computed(() => [
  { name: 'home', label: currentLang.value === 'es' ? 'Inicio' : 'Home', icon: Sparkles },
  { name: 'events', label: currentLang.value === 'es' ? 'Eventos' : 'Events', icon: Calendar },
  { name: 'podcast', label: currentLang.value === 'es' ? 'Podcast' : 'Podcast', icon: Headphones },
  { name: 'blog', label: currentLang.value === 'es' ? 'Blog' : 'Blog', icon: BookOpen },
  { name: 'manifesto', label: currentLang.value === 'es' ? 'Manifiesto' : 'Manifesto', icon: Scroll },
]);

const coinRotation = ref(0);
let angularVelocity = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let isFirstMove = true;
let animationFrameId = 0;
let lastTapTime = 0;
let tapStreak = 0;

const FRICTION = 0.985;
const SPEED_SCALE = 0.05;

function handleCoinMouseMove(event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const currentX = event.clientX;
  const currentY = event.clientY;
  
  if (isFirstMove) {
    lastMouseX = currentX;
    lastMouseY = currentY;
    isFirstMove = false;
    return;
  }

  const dx = currentX - lastMouseX;
  const dy = currentY - lastMouseY;
  const speed = Math.sqrt(dx * dx + dy * dy);

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const v1x = lastMouseX - centerX;
  const v1y = lastMouseY - centerY;
  const v2x = currentX - centerX;
  const v2y = currentY - centerY;

  const crossProduct = (v1x * v2y) - (v1y * v2x);
  const direction = crossProduct >= 0 ? 1 : -1;

  angularVelocity += direction * speed * SPEED_SCALE;

  if (angularVelocity > 50) angularVelocity = 50;
  if (angularVelocity < -50) angularVelocity = -50;

  lastMouseX = currentX;
  lastMouseY = currentY;
}

function handleCoinMouseEnter() {
  isFirstMove = true;
}

function handleCoinTouchStart() {
  isFirstMove = true;
  const now = Date.now();
  
  // If taps are close together, increase the boost
  if (now - lastTapTime < 400) {
    tapStreak = Math.min(tapStreak + 1, 10);
  } else {
    tapStreak = 1;
  }
  
  lastTapTime = now;
  
  // Add a boost based on streak
  const boost = 8 + (tapStreak * 3);
  angularVelocity += boost;
  
  // Cap speed
  if (angularVelocity > 120) angularVelocity = 120;
}

function handleCoinTouchMove(event: TouchEvent) {
  if (event.touches.length > 0) {
    const touch = event.touches[0];
    if (!touch) return;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    
    if (isFirstMove) {
      lastMouseX = currentX;
      lastMouseY = currentY;
      isFirstMove = false;
      return;
    }

    const dx = currentX - lastMouseX;
    const dy = currentY - lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const v1x = lastMouseX - centerX;
    const v1y = lastMouseY - centerY;
    const v2x = currentX - centerX;
    const v2y = currentY - centerY;

    const crossProduct = (v1x * v2y) - (v1y * v2x);
    const direction = crossProduct >= 0 ? 1 : -1;

    angularVelocity += direction * speed * SPEED_SCALE;

    if (angularVelocity > 80) angularVelocity = 80;
    if (angularVelocity < -80) angularVelocity = -80;

    lastMouseX = currentX;
    lastMouseY = currentY;
  }
}

function updatePhysics() {
  if (Math.abs(angularVelocity) > 0.5) {
    coinRotation.value += angularVelocity;
    angularVelocity *= FRICTION;
  } else {
    angularVelocity = 0;
    const targetAngle = Math.round(coinRotation.value / 180) * 180;
    const diff = targetAngle - coinRotation.value;
    
    if (Math.abs(diff) > 0.1) {
      coinRotation.value += diff * 0.1;
    } else {
      coinRotation.value = targetAngle;
    }
  }
  animationFrameId = requestAnimationFrame(updatePhysics);
}

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});

// ScrollSpy Logic
onMounted(() => {
  animationFrameId = requestAnimationFrame(updatePhysics);
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, observerOptions);

  // Observe all sections
  navLinks.value.forEach((link) => {
    const el = document.getElementById(link.name);
    if (el) observer.observe(el);
  });
});

function navigateTo(name: string) {
  isMenuOpen.value = false;
  
  if (route.name === 'home') {
    const element = document.getElementById(name);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      activeSection.value = name;
      return;
    }
  }
  
  router.push({ name: 'home', hash: `#${name}` });
}

function isActive(name: string) {
  if (route.name !== 'home') return false;
  return activeSection.value === name;
}
</script>

<template>
  <div class="min-h-screen bg-brand-surface font-sans text-brand-dark selection:bg-brand-secondary selection:text-brand-dark">
    <!-- Navigation -->
    <nav class="fixed w-full z-50 top-0 left-0 px-4 py-4">
      <div class="bg-white/90 backdrop-blur-lg rounded-full border border-white/40 shadow-lg shadow-brand-secondary/50 container mx-auto px-6 h-16 flex items-center justify-between">
        
        <!-- Logo -->
        <div class="flex items-center cursor-pointer" @click="navigateTo('home')">
          <img src="@/assets/logos/ltg-blk-logo.svg" alt="Ladies The Gathering" class="h-11 hidden lg:block" />
          <img src="@/assets/logos/ltg-dot.svg" alt="LTG" class="h-11 lg:hidden" />
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center gap-2">
          <button 
            v-for="link in navLinks" 
            :key="link.name"
            @click="navigateTo(link.name)"
            class="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all"
            :class="isActive(link.name) ? 'bg-brand-primary/20 text-brand-dark border-brand-primary' : 'text-slate-600 hover:bg-white/50 hover:text-brand-primary'"
          >
            {{ link.label }}
          </button>
          
          <div class="w-px h-6 bg-brand-secondary/30 mx-2"></div>

          <!-- Language Switcher -->
          <button 
            @click="triggerLanguageTransition"
            class="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest text-brand-dark/60 hover:bg-brand-surface transition-all border border-brand-secondary/30"
          >
            <Languages :size="16" /> {{ currentLang }}
          </button>
          
          <div class="w-px h-6 bg-brand-secondary/30 mx-2"></div>
          
          <SocialMenu />
        </div>

        <!-- Mobile Toggle -->
        <button 
          class="lg:hidden text-brand-dark p-2 focus:outline-none relative w-10 h-10 flex items-center justify-center" 
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Menu"
        >
          <div class="nav-icon" :class="{ 'open': isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="lg:hidden absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white flex flex-col gap-2 animate-in slide-in-from-top-4">
        <button 
          v-for="link in navLinks" 
          :key="link.name"
          @click="navigateTo(link.name)"
          class="flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all text-slate-600 hover:bg-brand-surface hover:text-brand-primary"
          :class="{ 'bg-brand-surface text-brand-dark': isActive(link.name) }"
        >
          <component :is="link.icon" :size="18" />
          {{ link.label }}
        </button>
        
        <button 
          @click="triggerLanguageTransition"
          class="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-brand-dark/60 hover:bg-brand-surface transition-all border border-brand-secondary/30"
        >
          <Languages :size="18" /> {{ currentLang }}
        </button>

        <hr class="border-brand-secondary/20 my-2" />
        
        <SocialMenu :isMobile="true" />
      </div>
    </nav>

    <!-- Main Content -->
    <main class="min-h-screen">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-brand-secondary/30 pt-16 pb-8">
      <div class="container mx-auto px-6 text-center">
        <div class="flex justify-center mb-6">
          <div 
            class="coin-container w-42 h-42 touch-none" 
            @mouseenter="handleCoinMouseEnter" 
            @mousemove="handleCoinMouseMove"
            @touchstart="handleCoinTouchStart"
            @touchmove.prevent="handleCoinTouchMove"
          >
            <div class="coin" :style="{ transform: `rotateY(${coinRotation}deg)` }">
              <div class="coin-side coin-front">
                <img src="@/assets/logos/ltg-dot-blk.svg" alt="LTG Logo Front" class="coin-svg w-full h-full" />
              </div>
              <div class="coin-side coin-back">
                <img src="@/assets/logos/ltg-dot.svg" alt="LTG Logo Back" class="coin-svg w-full h-full" />
              </div>
            </div>
          </div>
        </div>
        <p class="text-brand-dark/70 max-w-sm mx-auto mb-8 font-medium">
          Construyendo un reino donde cada carta jugada es un lazo de amistad fortalecido.
        </p>
        <div class="border-t border-brand-secondary/20 pt-8 text-brand-dark/40 text-sm">
          <p>© {{ new Date().getFullYear() }} Ladies The Gathering. Hecho con polvo de hadas y código.</p>
        </div>
      </div>
    </footer>
    <LanguageTransition 
      ref="transitionRef"
      @change="handleLanguageChange"
      @finish="handleLanguageTransitionFinish"
    />
  </div>
</template>

<style scoped>
.coin-container {
  perspective: 1000px; 
}

.coin {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  cursor: pointer;
}

.coin-side {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.coin-front {
  transform: rotateY(0deg);
  z-index: 2;
}

.coin-back {
  transform: rotateY(180deg);
}

.coin-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 5px 15px rgba(0,0,0,0.2));
  transition: filter 1s;
}

.coin-container:hover .coin-svg {
  filter: drop-shadow(-10px 5px 20px rgba(0,0,0,0.3));
}

/* Animated Hamburger Icon */
.nav-icon {
  width: 20px;
  height: 14px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
}

.nav-icon span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: currentColor;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}

.nav-icon span:nth-child(1) { top: 0px; }
.nav-icon span:nth-child(2) { top: 6px; }
.nav-icon span:nth-child(3) { top: 12px; }

.nav-icon.open span:nth-child(1) {
  top: 6px;
  transform: rotate(135deg);
}

.nav-icon.open span:nth-child(2) {
  opacity: 0;
  left: -20px;
}

.nav-icon.open span:nth-child(3) {
  top: 6px;
  transform: rotate(-135deg);
}
</style>
