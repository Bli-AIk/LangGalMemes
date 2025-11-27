<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-dark-bg/90 backdrop-blur-sm transition-opacity" 
      @click="!isDownloading && $emit('close')"
    ></div>

    <!-- Modal Content -->
    <div class="relative w-full max-w-5xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-row h-[85vh] md:h-[90vh] animate-modal-in">
      
      <!-- Close Button -->
      <button 
        @click="!isDownloading && $emit('close')"
        class="absolute top-2 right-2 md:top-4 md:right-4 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
        :disabled="isDownloading"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <!-- Left: Character Sidebar (Full Height) -->
      <div class="w-[120px] md:w-1/3 bg-slate-800 relative shrink-0 overflow-hidden border-r border-slate-700">
        <!-- Background Deco -->
        <div class="absolute inset-0 opacity-10 pointer-events-none" :style="{ backgroundColor: meme.color }"></div>
        
        <img 
          v-if="meme.imageUrl"
          :src="meme.imageUrl" 
          :alt="meme.name"
          class="w-full h-full object-cover object-top relative z-10 hover:scale-105 transition-transform duration-700"
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-white/5">
            <span class="text-4xl font-black text-white/20">{{ meme.name.substring(0,2).toUpperCase() }}</span>
        </div>
      </div>

      <!-- Right: Content Column -->
      <div class="flex-1 flex flex-col min-w-0 bg-dark-bg">
        
        <!-- Header Info -->
        <div class="p-4 md:p-8 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700 relative shrink-0">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-700 text-slate-300 border border-slate-600">
              Info
            </span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-700 text-primary border border-slate-600 truncate max-w-[120px]">
              {{ meme.techName }}
            </span>
          </div>
          <h2 class="text-2xl md:text-5xl font-heading font-black text-white mb-1 tracking-tight truncate">
            {{ meme.name }}
          </h2>
          <p class="text-xs md:text-lg font-medium mb-2 opacity-90 truncate" :style="{ color: meme.color }">{{ meme.tagline }}</p>
          <p class="text-slate-400 text-xs md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">{{ meme.description }}</p>
          
          <div class="mt-3 md:mt-6 flex flex-wrap gap-3 items-center">
            <button 
              @click="downloadAllAssets"
              :disabled="isDownloading"
              class="px-3 py-2 md:px-6 md:py-3 bg-primary hover:bg-fuchsia-600 disabled:bg-slate-600 disabled:cursor-wait text-white rounded-lg md:rounded-xl font-bold transition-all shadow-lg shadow-primary/25 flex items-center gap-2 text-xs md:text-base w-full md:w-auto justify-center relative overflow-hidden"
            >
              <!-- Loading State -->
              <template v-if="isDownloading">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ downloadProgress }}%</span>
                <div class="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-300" :style="{ width: `${downloadProgress}%` }"></div>
              </template>
              
              <!-- Normal State -->
              <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-5 md:h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download
              </template>
            </button>
          </div>
        </div>

        <!-- Scrollable Gallery Grid -->
        <div class="flex-1 overflow-y-auto bg-dark-bg custom-scrollbar relative">
             <!-- Sticky Header Inside Grid Area -->
            <div class="sticky top-0 z-10 bg-dark-bg/95 backdrop-blur border-b border-slate-800/50 px-4 py-2 md:px-8 md:py-4 shadow-lg flex flex-wrap justify-between items-center gap-2">
              <div class="flex items-center gap-4">
                <h3 class="text-sm md:text-2xl font-bold text-white flex items-center gap-2">
                  <span class="text-secondary">📂</span> <span class="hidden md:inline">Sticker Gallery</span><span class="md:hidden">Gallery</span>
                </h3>
                <!-- Background Toggle -->
                <div class="flex items-center gap-1 bg-slate-800/80 rounded-lg p-1 border border-slate-700">
                  <button 
                    @click="bgMode = 'transparent'"
                    class="px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-bold rounded-md transition-all"
                    :class="bgMode === 'transparent' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'"
                  >
                    Transparent
                  </button>
                  <button 
                    @click="bgMode = 'white_bg'"
                    class="px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-bold rounded-md transition-all"
                    :class="bgMode === 'white_bg' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-200'"
                  >
                    White BG
                  </button>
                </div>
              </div>
              
              <span class="text-[10px] md:text-sm font-medium text-slate-400 bg-slate-800 px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-slate-700">
                {{ totalCount }}
              </span>
            </div>
            
            <!-- Grid Content -->
            <div class="p-3 md:p-8 space-y-6 md:space-y-12 pb-12">
               <template v-if="meme.emojiPacks && meme.emojiPacks.length > 0">
                <div v-for="pack in meme.emojiPacks" :key="pack.name">
                  <div class="flex items-center gap-2 mb-2 md:mb-6">
                     <h4 class="text-xs md:text-lg font-bold text-white/90 uppercase tracking-wider font-heading flex items-center gap-2">
                       <span class="w-1 h-4 md:w-1.5 md:h-6 bg-primary rounded-full"></span>
                       {{ pack.name }}
                     </h4>
                     
                     <!-- Download Single Pack Button -->
                     <button 
                       @click="downloadPack(pack)"
                       :disabled="isDownloading"
                       class="ml-2 p-1.5 rounded-md bg-slate-800 hover:bg-primary text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                       title="Download this pack only"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                     </button>

                     <div class="h-px bg-slate-800 flex-grow"></div>
                  </div>
                  <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                    <div v-for="(emoji, index) in pack.items" :key="index" class="group relative aspect-square bg-slate-800 rounded-lg md:rounded-xl border border-slate-700 overflow-hidden hover:border-primary/50 transition-colors cursor-pointer">
                      <!-- Checkerboard background for transparent preview -->
                      <div 
                        class="absolute inset-0 opacity-20 pointer-events-none"
                        v-if="bgMode === 'transparent'"
                        style="background-image: radial-gradient(#475569 1px, transparent 1px); background-size: 10px 10px;"
                      ></div>
                      
                      <div class="absolute inset-0 flex items-center justify-center p-1 md:p-2">
                         <img :src="emoji[bgMode]" loading="lazy" class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"/>
                      </div>
                      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <a :href="emoji[bgMode]" download target="_blank" class="p-1.5 md:p-2 bg-white rounded-full text-black hover:bg-primary hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-4 md:h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></a>
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Meme, EmojiPack } from '../data/memes';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const props = defineProps<{
  meme: Meme;
}>();

defineEmits(['close']);

const isDownloading = ref(false);
const downloadProgress = ref(0);
const bgMode = ref<'transparent' | 'white_bg'>('transparent');

const totalCount = computed(() => {
  if (!props.meme.emojiPacks) return 0;
  return props.meme.emojiPacks.reduce((acc, pack) => acc + pack.items.length, 0);
});

const downloadPack = async (pack: EmojiPack) => {
  if (isDownloading.value) return;

  isDownloading.value = true;
  downloadProgress.value = 0;

  try {
    const zip = new JSZip();
    const modeSuffix = bgMode.value === 'white_bg' ? 'WhiteBG' : 'Transparent';
    const safePackName = pack.name.replace(/[^a-z0-9]/gi, '_');
    const folderName = `${props.meme.techName}_${safePackName}_${modeSuffix}`;
    const rootFolder = zip.folder(folderName);

    if (!rootFolder) throw new Error("Failed to create zip folder");

    const totalItems = pack.items.length;
    let processedCount = 0;

    const promises = pack.items.map(async (item) => {
      const url = item[bgMode.value];
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        const blob = await response.blob();

        const cleanUrl = url.split('?')[0];
        const filename = cleanUrl?.split('/').pop() || 'image.png';

        rootFolder.file(filename, blob);
      } catch (err) {
        console.error(`Skipping file ${url}:`, err);
      } finally {
        processedCount++;
        downloadProgress.value = Math.floor((processedCount / totalItems) * 100);
      }
    });

    await Promise.all(promises);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${folderName}.zip`);

  } catch (error) {
    console.error("Pack download failed:", error);
    alert("Failed to download pack. Please check console.");
  } finally {
    isDownloading.value = false;
    downloadProgress.value = 0;
  }
};

const downloadAllAssets = async () => {
  if (isDownloading.value) return;
  
  isDownloading.value = true;
  downloadProgress.value = 0;
  
  try {
    const zip = new JSZip();
    const modeSuffix = bgMode.value === 'white_bg' ? 'WhiteBG' : 'Transparent';
    const rootFolder = zip.folder(`${props.meme.techName}_Stickers_${modeSuffix}`);
    
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
      const promises = pack.items.map(async (item) => {
        const url = item[bgMode.value];
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
    saveAs(content, `${props.meme.techName}_Sticker_Collection_${modeSuffix}.zip`);

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
