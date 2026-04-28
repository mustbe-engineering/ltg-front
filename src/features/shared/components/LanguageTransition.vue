<script setup lang="ts">
import { gsap } from 'gsap';
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['change', 'finish']);

const path1 = ref<SVGPathElement | null>(null);
const path2 = ref<SVGPathElement | null>(null);
const overlayWrapper = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const numPoints = 10;
const delayPointsMax = 0.3;
const delayPerPath = 0.25;
const duration = 0.9;

let allPoints: number[][] = [];
let pointsDelay: number[] = [];
const isOpened = ref(true); // Keep locked to true for stable non-blinking paths

const initializePoints = () => {
  allPoints = [];
  for (let i = 0; i < 2; i++) {
    let points: number[] = [];
    for (let j = 0; j < numPoints; j++) {
      points.push(100);
    }
    allPoints.push(points);
  }
};

const render = () => {
  const paths = [path2.value, path1.value];
  for (let i = 0; i < 2; i++) {
    const path = paths[i];
    if (!path) continue;
    const points = allPoints[i];
    
    let d = "";
    d += `M 0 0 V ${points[0]} C`;
    
    for (let j = 0; j < numPoints - 1; j++) {
      let p = (j + 1) / (numPoints - 1) * 100;
      let cp = p - (1 / (numPoints - 1) * 100) / 2;
      d += ` ${cp} ${points[j]} ${cp} ${points[j+1]} ${p} ${points[j+1]}`;
    }
    
    d += ` V 100 H 0`;
    path.setAttribute("d", d);
  }
};

const playTransition = () => {
  if (!ctx) return;
  
  ctx.add(() => {
    if (overlayWrapper.value) {
      overlayWrapper.value.classList.remove('hidden');
    }

    const tl = gsap.timeline({
      onUpdate: render,
      onComplete: () => {
        if (overlayWrapper.value) {
          overlayWrapper.value.classList.add('hidden');
        }
        emit('finish');
      }
    });
    
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < numPoints; j++) {
        allPoints[i][j] = 100;
      }
    }
    
    for (let i = 0; i < numPoints; i++) {
      pointsDelay[i] = Math.random() * delayPointsMax;
    }
    
    // Phase 1: Points go 100 -> 0 (Covers viewport)
    for (let i = 0; i < 2; i++) {
      let points = allPoints[i];
      let pathDelay = delayPerPath * i;
      
      for (let j = 0; j < numPoints; j++) {
        let delay = pointsDelay[j];
        tl.to(points, {
          [j]: 0,
          duration: duration,
          ease: "power2.inOut"
        }, delay + pathDelay);
      }
    }
    
    // Midpoint sequence trigger
    tl.call(() => {
      emit('change');
    }, [], 1.5);
    
    // Phase 2: Points go 0 -> 100 (Clears viewport backwards)
    for (let i = 0; i < 2; i++) {
      let points = allPoints[i];
      let pathDelay = delayPerPath * (1 - i);
      
      for (let j = 0; j < numPoints; j++) {
        let delay = pointsDelay[j];
        tl.to(points, {
          [j]: 100,
          duration: duration,
          ease: "power2.inOut"
        }, 1.5 + delay + pathDelay);
      }
    }
  });
};

defineExpose({
  play: playTransition
});

onMounted(() => {
  initializePoints();
  ctx = gsap.context(() => {});
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <div ref="overlayWrapper" class="fixed inset-0 z-[100] pointer-events-none hidden">
    <svg class="shape-overlays w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="brandGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2E1065"/>
          <stop offset="100%" stop-color="#4C1D95"/>
        </linearGradient>
        <linearGradient id="brandGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#C084FC"/>
          <stop offset="100%" stop-color="#7E22CE"/>
        </linearGradient>
      </defs>
      <!-- Layer 2 (Gold Backdrop Wave) -->
      <path ref="path2" fill="url(#brandGrad2)"></path>
      <!-- Layer 1 (Indigo Primary Wave) -->
      <path ref="path1" fill="url(#brandGrad1)"></path>
    </svg>
  </div>
</template>
