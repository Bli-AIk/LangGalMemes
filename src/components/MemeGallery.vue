<template>
  <section id="gallery" class="py-16 px-4 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
      <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight self-start md:self-auto">
        <span class="text-accent">#</span> Collection
      </h2>
      
      <!-- Filter Tabs -->
      <div class="flex flex-wrap gap-2 bg-slate-900/80 backdrop-blur-sm p-1.5 rounded-xl border border-slate-800 shadow-lg">
        <button 
          v-for="tab in categories" 
          :key="tab"
          @click="activeTab = tab"
          class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden"
          :class="activeTab === tab ? 'text-white bg-slate-700 shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'"
        >
          {{ tab }}
          <!-- Active Indicator -->
          <span v-if="activeTab === tab" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary mb-0.5"></span>
        </button>
      </div>
    </div>

    <!-- Grid -->
    <!-- Added 'relative' to container for absolute positioning context -->
    <TransitionGroup 
      name="list" 
      tag="div" 
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative"
      @before-leave="onBeforeLeave"
    >
      <MemeCard 
        v-for="meme in filteredMemes" 
        :key="meme.id" 
        :meme="meme" 
        @open="openModal"
      />
    </TransitionGroup>

    <!-- Empty State -->
    <div v-if="filteredMemes.length === 0" class="text-center py-20">
      <p class="text-slate-500 text-lg font-mono">No characters found in this category.</p>
    </div>

    <!-- Detail Modal -->
    <Teleport to="body">
      <Transition 
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <MemeDetailModal 
          v-if="selectedMeme" 
          :meme="selectedMeme" 
          @close="closeModal" 
        />
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { memes, type Meme } from '../data/memes';
import MemeCard from './MemeCard.vue';
import MemeDetailModal from './MemeDetailModal.vue';

const categories = ['All', 'Language', 'Engine', 'Editor', 'Runtime'];
const activeTab = ref('All');

const filteredMemes = computed(() => {
  if (activeTab.value === 'All') {
    return memes;
  }
  return memes.filter(meme => meme.tags.includes(activeTab.value));
});

const selectedMeme = ref<Meme | null>(null);

const openModal = (meme: Meme) => {
  selectedMeme.value = meme;
  document.body.style.overflow = 'hidden'; // Lock scroll
};

const closeModal = () => {
  selectedMeme.value = null;
  document.body.style.overflow = ''; // Unlock scroll
};

// JS Hook to lock dimensions before absolute positioning
const onBeforeLeave = (el: Element) => {
  const htmlEl = el as HTMLElement;
  // Get current geometry
  const rect = htmlEl.getBoundingClientRect();
  // We need to handle the offset relative to the container if we use left/top,
  // BUT for simple grid fade-out, just locking width/height is usually enough 
  // IF the container doesn't collapse.
  // However, safest bet for 'absolute' is to lock everything.
  
  htmlEl.style.width = `${rect.width}px`;
  htmlEl.style.height = `${rect.height}px`;
  // IMPORTANT: We must position it where it currently IS relative to the grid container
  htmlEl.style.left = `${htmlEl.offsetLeft}px`;
  htmlEl.style.top = `${htmlEl.offsetTop}px`;
};
</script>

<style scoped>
.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.9); /* Slight shrink effect */
}

.list-leave-active {
  position: absolute; /* Key for smooth reflow */
  z-index: 0; /* Ensure leaving items don't overlap hovering ones */
  pointer-events: none; /* Prevent clicks on fading items */
}
</style>