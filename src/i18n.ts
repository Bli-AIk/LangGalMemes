import { createI18n } from 'vue-i18n';
import en from './locales/en.yaml';
import zh from './locales/zh.yaml';

// Get user's preferred language
const getBrowserLocale = () => {
  const navigatorLocale = navigator.language; 
  if (navigatorLocale) {
    // Check if it starts with 'zh'
    if (navigatorLocale.toLowerCase().startsWith('zh')) {
      return 'zh';
    }
  }
  return 'en';
};

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: getBrowserLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
});

export default i18n;
