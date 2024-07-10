import { defineStore } from 'pinia';

type Tab = {
  value: string;
  title: string;
};
export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [
      {
        value: '/dashboard',
        title: 'Dashboard',
      },
    ] as Tab[],
    selectedTab: '/dashboard' as string,
  }),

  actions: {
    setTabs(title: string, path: string) {
      if (!this.tabs.some((tab) => tab.value === path)) {
        this.tabs.push({
          title: title,
          value: path,
        });
      }
      this.setSelectedTab(path);
    },
    setSelectedTab(path: string) {
      this.selectedTab = path;
    },
    deleteTab(path: string) {
      const index = this.tabs.findIndex((tab) => tab.value === path);
      if (index !== -1) {
        this.tabs.splice(index, 1);
      }
    },
  },
  getters: {
    getTabs: (state): Tab[] => {
      return state.tabs;
    },
  },
});
