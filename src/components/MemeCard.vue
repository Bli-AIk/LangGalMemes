<template>
  <div class="group relative bg-card-bg rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-slate-700 hover:border-primary/50">
    <!-- Image Container -->
    <div class="aspect-[4/5] overflow-hidden relative">
      <img 
        :src="meme.imageUrl" 
        :alt="meme.name" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <!-- Overlay (Visible on Hover) -->
      <div class="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <p class="text-sm text-gray-300 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {{ meme.description }}
        </p>
        <a 
          :href="meme.imageUrl" 
          download 
          target="_blank"
          class="w-full py-2 bg-secondary text-dark-bg font-bold rounded-lg text-center hover:bg-yellow-300 transition-colors shadow-lg"
        >
          Download Meme
        </a>
      </div>
    </div>

    <!-- Card Info (Always Visible) -->
    <div class="p-4 relative z-10 bg-card-bg">
      <h3 class="text-xl font-cartoon text-white mb-1 group-hover:text-primary transition-colors">
        {{ meme.name }}
      </h3>
      <p class="text-sm font-medium" :style="{ color: meme.color }">
        {{ meme.tagline }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Meme } from '../data/memes';

defineProps<{
  meme: Meme;
}>();
</script>
