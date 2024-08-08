import { defineStore } from 'pinia';
import router from '@/router';
import { $t } from '@/plugins/i18n/i18nUtils';

type Tab = {
  value: string;
  title: string;
};
export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [
      {
        value: '/dashboard',
        title: $t('title.dashboard'),
      },
    ] as Tab[],
    selectedTab: '/dashboard' as string,
  }),
  persist: true,
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
      const existingTab = this.tabs.find((tab) => tab.value === path);
      if (!existingTab) {
        const route = router.getRoutes().find((route) => route.path === path);
        if (route) {
          this.tabs.push({
            value: path,
            title: route.meta.title || 'Untitled', // 使用页面的标题，如果没有则使用默认标题
          });
        }
      }
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
