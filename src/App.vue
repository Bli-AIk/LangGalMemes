<template>
  <div class="min-h-screen flex flex-col relative">
    <!-- Global Effects -->
    <div class="bg-grid-animate"></div>

    <!-- Navigation -->
    <nav class="py-6 px-4 border-b border-white/5 bg-dark-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="text-2xl font-black text-white tracking-wider cursor-pointer select-none font-heading" @click="scrollToTop">
          Lang<span class="text-primary">Gal</span> <span class="text-pink-500">🎔</span>
        </div>
        <a href="https://github.com" target="_blank" class="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0 3 1.5 2.6 2.6 0 0 0-3-1.55A9.9 9.9 0 0 0 12 0a9.93 9.93 0 0 0-3.5 1.55B2.6 2.6 0 0 0 5 4c-3 1.5-4 2.5-4 5.5 0 3.2 3 5.5 6 5.5-.7.8-1.1 2-1.1 3-.5 1-.5 2-1 3"/><path d="M9 22v-4c0-1.35.15-2.7 1-3.5"/></svg>
        </a>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow relative z-10">
      <HeroSection />
      <MemeGallery />
    </main>

    <!-- Footer -->
    <footer class="py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
      <p>&copy; {{ new Date().getFullYear() }} LangGal Memes. Generated with Nano Banana Pro.</p>
      <p class="mt-2">Made with 💜 by Vue & Tailwind.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import HeroSection from './components/HeroSection.vue';
import MemeGallery from './components/MemeGallery.vue';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>