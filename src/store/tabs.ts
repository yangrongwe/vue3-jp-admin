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
    removeTab(path: string) {
      const index = this.tabs.findIndex((tab) => tab.value === path);
      if (index !== -1 && this.tabs.length > 1) {
        // Ensure there's always at least one tab
        this.tabs.splice(index, 1);
        if (this.selectedTab === path) {
          const nextTab = this.tabs[index] || this.tabs[index - 1];
          this.selectedTab = nextTab ? nextTab.value : '';
        }
      }
    },
  },
  getters: {
    getTabs: (state): Tab[] => {
      return state.tabs;
    },
  },
});
