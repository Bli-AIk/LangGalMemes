<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-dark-bg/90 backdrop-blur-sm transition-opacity" 
      @click="!isDownloading && $emit('close')"
    ></div>

    <!-- Modal Content -->
    <div class="relative w-full max-w-5xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-modal-in">
      
      <!-- Close Button -->
      <button 
        @click="!isDownloading && $emit('close')"
        class="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isDownloading"
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
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-700 text-primary border border-slate-600">
              {{ meme.techName }}
            </span>
          </div>
          <h2 class="text-4xl md:text-5xl font-heading font-black text-white mb-4 tracking-tight">
            {{ meme.name }}
          </h2>
          <p class="text-lg font-medium mb-4" :style="{ color: meme.color }">{{ meme.tagline }}</p>
          <p class="text-slate-400 leading-relaxed max-w-xl">{{ meme.description }}</p>
          
          <div class="mt-8 flex flex-wrap gap-4 items-center">
            <button 
              @click="downloadAllAssets"
              :disabled="isDownloading"
              class="px-6 py-3 bg-primary hover:bg-fuchsia-600 disabled:bg-slate-600 disabled:cursor-wait text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/25 flex items-center gap-2 min-w-[200px] justify-center relative overflow-hidden"
            >
              <!-- Loading State -->
              <template v-if="isDownloading">
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm">Zipping {{ downloadProgress }}%</span>
                <!-- Progress Bar Background -->
                <div class="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-300" :style="{ width: `${downloadProgress}%` }"></div>
              </template>
              
              <!-- Normal State -->
              <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download All Packs
              </template>
            </button>
          </div>

          <!-- Credits Section -->
          <div class="mt-6 pt-6 border-t border-white/5 text-xs text-slate-500 flex flex-col gap-1">
            <div class="flex items-center gap-2">
              <span class="font-bold uppercase tracking-wider text-slate-400">Source:</span>
              <a v-if="meme.credits.url" :href="meme.credits.url" target="_blank" class="hover:text-primary transition-colors border-b border-transparent hover:border-primary truncate max-w-xs">
                {{ meme.credits.source }} ↗
              </a>
              <span v-else>{{ meme.credits.source }}</span>
            </div>
            <div v-if="meme.credits.copyright" class="flex items-center gap-2">
              <span class="font-bold uppercase tracking-wider text-slate-400">License:</span>
              <span>{{ meme.credits.copyright }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content: Meme Grid -->
      <div class="flex-1 overflow-y-auto bg-dark-bg custom-scrollbar">
        
        <!-- Sticky Header -->
        <div class="sticky top-0 z-10 bg-dark-bg border-b border-slate-800/50 px-8 py-4 shadow-lg shadow-black/20 flex justify-between items-center">
          <h3 class="text-2xl font-bold text-white flex items-center gap-2">
            <span class="text-secondary">📂</span> Sticker Gallery
          </h3>
          <span class="text-sm font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            {{ totalCount }} Items
          </span>
        </div>
        
        <!-- Grid container with padding -->
        <div class="p-8 space-y-12">
          
          <template v-if="meme.emojiPacks && meme.emojiPacks.length > 0">
            <div v-for="pack in meme.emojiPacks" :key="pack.name">
              <!-- Pack Header -->
              <div class="flex items-center gap-4 mb-6">
                 <h4 class="text-lg font-bold text-white/90 uppercase tracking-wider font-heading flex items-center gap-2">
                   <span class="w-1.5 h-6 bg-primary rounded-full"></span>
                   {{ pack.name }}
                 </h4>
                 <div class="h-px bg-slate-800 flex-grow"></div>
              </div>

              <!-- Pack Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="(emoji, index) in pack.items" :key="index" class="group relative aspect-square bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-primary/50 transition-colors cursor-pointer">
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
            </div>
          </template>
          
          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center py-20 text-slate-500">
             <span class="text-4xl mb-4">🚧</span>
             <p class="text-lg">No stickers available yet.</p>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Meme } from '../data/memes';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const props = defineProps<{
  meme: Meme;
}>();

defineEmits(['close']);

const isDownloading = ref(false);
const downloadProgress = ref(0);

const totalCount = computed(() => {
  if (!props.meme.emojiPacks) return 0;
  return props.meme.emojiPacks.reduce((acc, pack) => acc + pack.items.length, 0);
});

const downloadAllAssets = async () => {
  if (isDownloading.value) return;
  
  isDownloading.value = true;
  downloadProgress.value = 0;
  
  try {
    const zip = new JSZip();
    const rootFolder = zip.folder(`${props.meme.techName}_Stickers`);
    
    if (!rootFolder) throw new Error("Failed to create zip folder");

    // Calculate total items for progress
    const totalItems = totalCount.value;
    let processedCount = 0;

    // Iterate through all packs
    for (const pack of props.meme.emojiPacks) {
      const packFolder = rootFolder.folder(pack.name.replace(/[^a-z0-9]/gi, '_')); // Sanitize folder name
      
      if (!packFolder) continue;

      // Download images sequentially to avoid network bottlenecks, or parallel for speed
      // Let's do parallel batches to be nice but fast
      const promises = pack.items.map(async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch ${url}`);
          const blob = await response.blob();
          
          // Extract filename from URL (e.g., emoji_1.png)
          // Remove query params if any
          const cleanUrl = url.split('?')[0];
          const filename = cleanUrl?.split('/').pop() || 'image.png';
          
          packFolder.file(filename, blob);
        } catch (err) {
          console.error(`Skipping file ${url}:`, err);
        } finally {
          processedCount++;
          downloadProgress.value = Math.floor((processedCount / totalItems) * 100);
        }
      });

      await Promise.all(promises);
    }

    // Generate zip file
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${props.meme.techName}_Sticker_Collection.zip`);

  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to create zip file. Please check console for details.");
  } finally {
    isDownloading.value = false;
    downloadProgress.value = 0;
  }
};
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
