import { defineStore } from 'pinia';

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [],
  }),

  actions: {
    setTabs(tabs) {
      //
    },
  },
  getters: {
    getTabs: (state) => {
      return state.tabs;
    },
  },
});
