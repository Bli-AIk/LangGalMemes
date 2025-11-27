<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-dark-bg/90 backdrop-blur-sm transition-opacity" 
      @click="$emit('close')"
    ></div>

    <!-- Modal Content -->
    <div class="relative w-full max-w-5xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-modal-in">
      
      <!-- Close Button -->
      <button 
        @click="$emit('close')"
        class="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <!-- Header Section (Split Layout) -->
      <div class="flex flex-col md:flex-row bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700 shrink-0">
        
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
              Download Pack
            </button>
          </div>
        </div>
      </div>

      <!-- Content: Meme Grid -->
      <div class="flex-1 overflow-y-auto bg-dark-bg p-8 custom-scrollbar">
        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2 sticky top-0 bg-dark-bg/95 backdrop-blur-sm py-2 z-10">
          <span class="text-secondary">📂</span> Sticker Gallery
          <span class="text-sm font-normal text-slate-500 ml-2">({{ meme.emojis?.length || 0 }} items)</span>
        </h3>
        
        <div v-if="meme.emojis && meme.emojis.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-8">
          <!-- Real Emojis -->
          <div v-for="(emoji, index) in meme.emojis" :key="index" class="group relative aspect-square bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-primary/50 transition-colors cursor-pointer">
            <div class="absolute inset-0 flex items-center justify-center p-2">
               <img 
                 :src="emoji" 
                 loading="lazy"
                 class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
               />
            </div>
            <!-- Hover Actions -->
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <a :href="emoji" download target="_blank" class="p-2 bg-white rounded-full text-black hover:bg-primary hover:text-white transition-colors" title="Download">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-slate-500">
           <span class="text-4xl mb-4">🚧</span>
           <p class="text-lg">No stickers available yet.</p>
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

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #0f172a;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
</style>