<template>
  <section class="relative py-20 px-4 text-center overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="relative z-10">
      <h1 class="text-6xl md:text-8xl font-cartoon text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent mb-6 animate-float drop-shadow-lg">
        LangGal Memes
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide">
        Where Code Meets Kawaii. <br/>
        <span class="text-secondary font-medium">Download your favorite Programming Language Waifus!</span>
      </p>
      
      <div class="mt-10">
        <button @click="scrollToGallery" class="px-8 py-3 bg-primary hover:bg-fuchsia-600 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/50">
          Explore Gallery
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToGallery = () => {
  const gallery = document.getElementById('gallery');
  if (gallery) {
    gallery.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
