// stores/i18nStore.ts
import { defineStore } from 'pinia';

export const useI18nStore = defineStore('i18nStore', {
  state: () => ({
    locale: 'ja',
  }),
  actions: {
    setLocale(locale: string) {
      this.locale = locale;
    },
  },
});
