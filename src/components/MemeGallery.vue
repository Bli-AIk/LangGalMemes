<template>
  <section id="gallery" class="py-16 px-4 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-10">
      <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">
        <span class="text-accent">#</span> Collection
      </h2>
      <!-- Filter Tabs -->
      <div class="hidden md:flex gap-2 bg-slate-900/50 p-1 rounded-full border border-slate-800">
        <button class="px-4 py-1.5 bg-slate-700 rounded-full text-sm text-white shadow-sm font-medium transition-all">All</button>
        <button class="px-4 py-1.5 bg-transparent text-slate-400 hover:text-white text-sm font-medium transition-all">Editors</button>
        <button class="px-4 py-1.5 bg-transparent text-slate-400 hover:text-white text-sm font-medium transition-all">Runtimes</button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <MemeCard 
        v-for="meme in memes" 
        :key="meme.id" 
        :meme="meme" 
        @open="openModal"
      />
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
import { ref } from 'vue';
import { memes, type Meme } from '../data/memes';
import MemeCard from './MemeCard.vue';
import MemeDetailModal from './MemeDetailModal.vue';

const selectedMeme = ref<Meme | null>(null);

const openModal = (meme: Meme) => {
  selectedMeme.value = meme;
  document.body.style.overflow = 'hidden'; // Lock scroll
};

const closeModal = () => {
  selectedMeme.value = null;
  document.body.style.overflow = ''; // Unlock scroll
};
</script>