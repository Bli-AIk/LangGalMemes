<template>
  <div 
    class="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20 hover:shadow-2xl border border-slate-700 hover:border-primary/50 ring-1 ring-white/5 cursor-pointer flex flex-col h-full"
    @click="$emit('open', meme)"
  >
    <!-- Image/Visual Container -->
    <div class="aspect-[4/5] overflow-hidden relative bg-slate-900/50 p-8 flex items-center justify-center border-b border-slate-700/50">
      <!-- Glow Effect -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-t from-primary/30 to-transparent"></div>
      
      <template v-if="meme.imageUrl">
        <img 
          :src="meme.imageUrl" 
          :alt="meme.name" 
          class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg relative z-10"
        />
      </template>
      
      <!-- Fallback for no image -->
      <template v-else>
        <div class="w-full h-full flex flex-col items-center justify-center text-slate-600 group-hover:text-slate-400 transition-colors">
          <span class="text-6xl font-black opacity-20 select-none">{{ meme.name.substring(0, 2).toUpperCase() }}</span>
          <span class="mt-2 text-sm font-mono opacity-50">NO SIGNAL</span>
        </div>
      </template>
      
      <!-- Overlay Action Hint -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/20 backdrop-blur-[1px]">
        <span class="bg-white text-dark-bg px-4 py-2 rounded-full font-bold shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
          View Gallery
        </span>
      </div>
    </div>

    <!-- Card Info -->
    <div class="p-5 relative z-10 bg-slate-800/30 flex-grow flex flex-col justify-between">
      <div>
        <h3 class="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors tracking-tight">
          {{ meme.name }}
        </h3>
        <p class="text-sm font-medium opacity-90 mb-3" :style="{ color: meme.color }">
          {{ meme.tagline }}
        </p>
      </div>
      
      <!-- Description Preview (Truncated) -->
      <p class="text-sm text-slate-400 line-clamp-2 leading-relaxed">
        {{ meme.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Meme } from '../data/memes';

defineProps<{
  meme: Meme;
}>();

defineEmits<{
  (e: 'open', meme: Meme): void;
}>();
</script>
