<template>
  <section class="relative py-24 px-4 text-center overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

    <div class="relative z-10">
      <h1 class="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent mb-6 drop-shadow-2xl">
        LangGal Memes
      </h1>
      <p class="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-normal tracking-wide">
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
