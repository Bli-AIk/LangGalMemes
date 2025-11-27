<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-dark-bg/90 backdrop-blur-sm transition-opacity" 
      @click="$emit('close')"
    ></div>

    <!-- Modal Content -->
    <div class="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-modal-in">
      
      <!-- Close Button -->
      <button 
        @click="$emit('close')"
        class="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <!-- Header Section (Split Layout) -->
      <div class="flex flex-col md:flex-row bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700">
        
        <!-- Left: Logo / Visual -->
        <div class="w-full md:w-1/3 p-8 flex items-center justify-center bg-slate-800/50 relative overflow-hidden">
          <!-- Background Deco -->
          <div class="absolute inset-0 opacity-10 pointer-events-none" :style="{ backgroundColor: meme.color }"></div>
          
          <img 
            v-if="meme.imageUrl"
            :src="meme.imageUrl" 
            :alt="meme.name"
            class="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl relative z-10 transform transition-transform hover:scale-105"
          />
          <div v-else class="w-48 h-48 flex items-center justify-center rounded-full border-4 border-white/10 bg-white/5">
             <span class="text-6xl font-black text-white/20">{{ meme.name.substring(0,2).toUpperCase() }}</span>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="w-full md:w-2/3 p-8 flex flex-col justify-center">
          <div class="flex items-center gap-3 mb-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-700 text-slate-300 border border-slate-600">
              Character Info
            </span>
          </div>
          <h2 class="text-4xl md:text-5xl font-heading font-black text-white mb-4 tracking-tight">
            {{ meme.name }}
          </h2>
          <p class="text-lg font-medium mb-4" :style="{ color: meme.color }">{{ meme.tagline }}</p>
          <p class="text-slate-400 leading-relaxed max-w-xl">{{ meme.description }}</p>
          
          <div class="mt-8 flex flex-wrap gap-4">
            <button class="px-6 py-3 bg-primary hover:bg-fuchsia-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download All Assets
            </button>
          </div>
        </div>
      </div>

      <!-- Content: Meme Grid -->
      <div class="flex-1 overflow-y-auto bg-dark-bg p-8">
        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span class="text-secondary">📂</span> Sticker Pack
          <span class="text-sm font-normal text-slate-500 ml-2">(6 items)</span>
        </h3>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <!-- Mock Items -->
          <div v-for="i in 6" :key="i" class="group relative aspect-square bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-primary/50 transition-colors cursor-pointer">
            <div class="absolute inset-0 flex items-center justify-center p-4">
               <!-- Using the logo as a placeholder for memes, with filters -->
               <img 
                 v-if="meme.imageUrl" 
                 :src="meme.imageUrl" 
                 class="w-full h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                 :style="{ filter: `hue-rotate(${i * 45}deg)` }" 
               />
               <span v-else class="text-4xl">📦</span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm text-center translate-y-full group-hover:translate-y-0 transition-transform">
              <span class="text-xs text-white font-medium">sticker_{{i}}.png</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Meme } from '../data/memes';

defineProps<{
  meme: Meme;
}>();

defineEmits(['close']);
</script>

<style scoped>
.animate-modal-in {
  animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
