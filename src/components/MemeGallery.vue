<template>
  <section id="gallery" class="py-16 px-4 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-10">
      <h2 class="text-3xl md:text-4xl font-cartoon text-white">
        <span class="text-accent">#</span> Collection
      </h2>
      <!-- Placeholder for potential filter buttons -->
      <div class="hidden md:flex gap-2">
        <span class="px-3 py-1 bg-slate-800 rounded-full text-xs text-gray-400 border border-slate-700">All</span>
        <span class="px-3 py-1 bg-transparent rounded-full text-xs text-gray-500 border border-transparent hover:border-slate-700 hover:text-gray-400 transition-colors cursor-pointer">Static</span>
        <span class="px-3 py-1 bg-transparent rounded-full text-xs text-gray-500 border border-transparent hover:border-slate-700 hover:text-gray-400 transition-colors cursor-pointer">Dynamic</span>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <MemeCard 
        v-for="meme in memes" 
        :key="meme.id" 
        :meme="meme" 
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { memes } from '../data/memes';
import MemeCard from './MemeCard.vue';
</script>
