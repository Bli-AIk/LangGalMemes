<template>
  <section class="relative py-32 px-4 text-center overflow-hidden">
    <!-- Dynamic Lighting -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
    <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

    <div class="relative z-10 flex flex-col items-center">
      <h1 class="text-6xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl mb-8">
        {{ t('hero.title') }}
      </h1>
      
      <p class="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-normal tracking-wide border-l-4 border-primary pl-6 text-left bg-slate-900/50 p-4 backdrop-blur-sm rounded-r-lg">
        <span class="block text-sm font-mono text-accent mb-2">{{ t('hero.system_ready') }}</span>
        {{ t('hero.subtitle_1') }} <br/>
        <span class="text-secondary font-medium">{{ t('hero.subtitle_2') }}</span>
      </p>
      
      <div class="mt-12 flex gap-4">
        <button @click="scrollToGallery" class="px-8 py-4 bg-primary hover:bg-fuchsia-600 text-white rounded-none font-bold text-lg transition-all clip-path-button relative overflow-hidden group tracking-widest uppercase font-mono">
          <span class="relative z-10">{{ t('hero.cta_button') }}</span>
          <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const scrollToGallery = () => {
  const gallery = document.getElementById('gallery');
  if (gallery) {
    gallery.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.clip-path-button {
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}
</style>
