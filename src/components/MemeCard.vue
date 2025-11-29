<template>
  <div 
    class="card-container perspective-1000"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @click="$emit('open', meme)"
  >
    <div 
      class="card-content group relative bg-slate-800/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/5 ring-1 ring-white/10 cursor-pointer transition-all duration-200 ease-out will-change-transform"
      :style="cardStyle"
    >
      <!-- Image/Visual Container -->
      <div class="aspect-[4/5] overflow-hidden relative bg-slate-900/50 px-4 pt-8 pb-0 flex items-end justify-center border-b border-white/5">
        
        <!-- Ambient Glow based on meme color -->
        <div 
          class="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-[40px]"
          :style="{ background: `radial-gradient(circle at center, ${meme.color} 0%, transparent 70%)` }"
        ></div>
        
        <template v-if="meme.imageUrl">
          <img 
            :src="meme.imageUrl" 
            :alt="meme.name" 
            class="w-full h-full object-contain object-bottom transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl relative z-10 origin-bottom"
            style="filter: drop-shadow(0 0 15px rgba(0,0,0,0.5));"
          />
        </template>
        
        <!-- Fallback for no image -->
        <template v-else>
          <div class="w-full h-full flex flex-col items-center justify-center text-slate-600 group-hover:text-slate-400 transition-colors">
            <span class="text-6xl font-black opacity-20 select-none">{{ meme.name.substring(0, 2).toUpperCase() }}</span>
          </div>
        </template>

        <!-- Tech Name Badge (Bottom Right) -->
        <div class="absolute bottom-3 right-3 z-20">
          <span class="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-slate-300 shadow-lg group-hover:text-white group-hover:border-white/30 transition-colors">
            {{ meme.techName }}
          </span>
        </div>
        
        <!-- Cyberpunk Overlay Action Hint -->
        <div class="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 translate-y-2 group-hover:translate-y-0">
           <div class="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
           </div>
        </div>
      </div>

      <!-- Card Info -->
      <div class="p-5 relative z-10 bg-slate-900/40 flex-grow flex flex-col justify-between border-t border-white/5 group-hover:bg-slate-900/60 transition-colors">
        <div>
          <div class="flex justify-between items-start">
            <h3 
              class="text-xl font-bold text-white mb-1 transition-colors duration-300 tracking-tight font-heading"
              :style="{ color: isHovering ? titleHoverColor : '' }"
            >
              {{ meme.name }}
            </h3>
            <div class="h-2 w-2 rounded-full animate-pulse" :style="{ backgroundColor: meme.color }"></div>
          </div>
          <p class="text-xs font-bold uppercase tracking-widest opacity-70 mb-3" :style="{ color: meme.color }">
            {{ meme.tagline }}
          </p>
        </div>
        
        <div class="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-3"></div>

        <p class="text-sm text-slate-400 line-clamp-2 leading-relaxed font-light whitespace-pre-wrap">
          {{ meme.description }}
        </p>
        
        <!-- Tags (Optional display in card body too) -->
        <div class="mt-3 flex flex-wrap gap-1">
          <span v-for="tag in meme.tags" :key="tag" class="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-slate-500 border border-white/5">
            #{{ tag }}
          </span>
        </div>
        
        <!-- Credits -->
        <div class="mt-3 pt-2 border-t border-white/5 text-[10px] text-slate-600 truncate group-hover:text-slate-500 transition-colors" :title="meme.credits.copyright">
          <span class="mr-1">{{ t('card.source') }}</span>
          <a 
            v-if="meme.credits.url" 
            :href="meme.credits.url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="hover:text-primary hover:underline decoration-primary/50 transition-colors z-30 relative"
            @click.stop
          >
            {{ meme.credits.source }}
          </a>
          <span v-else>
            {{ meme.credits.source }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Meme } from '../data/memes';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  meme: Meme;
}>();

defineEmits<{
  (e: 'open', meme: Meme): void;
}>();

const mouseX = ref(0);
const mouseY = ref(0);
const isHovering = ref(false);

const handleMouseMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  mouseX.value = x / rect.width;
  mouseY.value = y / rect.height;
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  // Reset gently
  mouseX.value = 0.5;
  mouseY.value = 0.5;
};

const getHoverColor = (hex: string) => {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse RGB
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // RGB to HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Adjustments (微调 HSV)
  // Increase Saturation to make it pop
  s = Math.min(s + 0.2, 1); 
  // Ensure Lightness is high enough to be readable on dark bg
  l = Math.max(l, 0.7); // Min 70% lightness
  l = Math.min(l + 0.1, 0.95); // Add brightness, cap at 95%

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

const titleHoverColor = computed(() => getHoverColor(props.meme.color));

const cardStyle = computed(() => {
  if (!isHovering.value) {
    return {
      transform: 'rotateY(0deg) rotateX(0deg) scale(1)',
    };
  }

  const rotateX = (mouseY.value - 0.5) * -20; // Max 10deg tilt
  const rotateY = (mouseX.value - 0.5) * 20; 

  return {
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
  };
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.card-content {
  transform-style: preserve-3d;
}
</style>