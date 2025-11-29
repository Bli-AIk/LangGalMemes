<template>
  <section id="gallery" class="py-16 px-4 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
      <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight self-start md:self-auto">
        <span class="text-accent">#</span> {{ t('gallery.collection') }}
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
          {{ t('categories.' + tab.toLowerCase()) }}
          <!-- Active Indicator -->
          <span v-if="activeTab === tab" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary mb-0.5"></span>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-32">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-primary"></div>
      <span class="ml-3 text-slate-400 animate-pulse">{{ t('gallery.loading') }}</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-400 text-lg font-mono">{{ error }}</p>
      <button @click="fetchMemes" class="mt-4 px-4 py-2 bg-slate-800 rounded text-white hover:bg-slate-700">{{ t('gallery.retry') }}</button>
    </div>

    <!-- Grid -->
    <!-- Added 'relative' to container for absolute positioning context -->
    <TransitionGroup 
      v-else
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
    <div v-if="!loading && !error && filteredMemes.length === 0" class="text-center py-20">
      <p class="text-slate-500 text-lg font-mono">{{ t('gallery.empty') }}</p>
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
import { ref, computed, onMounted, watch } from 'vue';
import { loadMemes, type Meme } from '../data/memes';
import MemeCard from './MemeCard.vue';
import MemeDetailModal from './MemeDetailModal.vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const categories = ['All', 'Language', 'Engine', 'Editor', 'OS', 'Utils'];
const activeTab = ref('All');
const memes = ref<Meme[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const filteredMemes = computed(() => {
  if (activeTab.value === 'All') {
    return memes.value;
  }
  
  if (activeTab.value === 'Utils') {
    const mainCategories = ['Language', 'Engine', 'Editor', 'OS'];
    const mainCategoriesTags = mainCategories.map(cat => t(`categories.${cat.toLowerCase()}`));
    return memes.value.filter(meme => 
      !meme.tags.some(tag => mainCategoriesTags.includes(tag))
    );
  }

  const currentTag = t(`categories.${activeTab.value.toLowerCase()}`);
  return memes.value.filter(meme => meme.tags.includes(currentTag));
});

const selectedMeme = ref<Meme | null>(null);

const getSortKey = (hex: string): number => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;

  // Calculate Saturation
  let s = 0;
  if (max !== min) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  }

  // If saturation is very low, treat as grayscale and move to end
  if (s < 0.1) {
    // Sort grayscale by lightness descending (Light/Silver -> Dark/Black)
    // Base value 2.0 ensures they come after all hues (0.0 - 1.0)
    // (1 - l) ensures higher lightness gives a lower score within this range
    return 2.0 + (1 - l);
  }

  // Calculate Hue for colorful items
  let h = 0;
  if (d === 0) {
    h = 0;
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return h;
};

const fetchMemes = async () => {
  loading.value = true;
  error.value = null;
  try {
    const rawMemes = await loadMemes(locale.value);
    memes.value = rawMemes.sort((a, b) => getSortKey(a.color) - getSortKey(b.color));
  } catch (err) {
    error.value = 'Failed to load characters data.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

watch(locale, () => {
  fetchMemes();
});

onMounted(() => {
  fetchMemes();
});

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