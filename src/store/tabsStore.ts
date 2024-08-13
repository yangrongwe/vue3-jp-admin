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
      let menuRoutes = JSON.parse(localStorage.getItem('menuRoutes')) || [];

      // 定义一个递归函数用于从嵌套的children中查找路径
      function findTitleByPath(routes, path: string): string | null {
        for (const route of routes) {
          if (route.path === path) {
            return route.meta?.title || null;
          }
          if (route.children) {
            const title = findTitleByPath(route.children, path);
            if (title) {
              return title;
            }
          }
        }
        return null;
      }

      let tabs = state.tabs.map((tab) => {
        console.log('tab', tab);
        const title = findTitleByPath(
          menuRoutes,
          tab.value.substring(tab.value.lastIndexOf('/') + 1)
        );

        return {
          ...tab,
          title: title || tab.title, // 如果没有找到title则保持原有title
        };
      });

      // 遍历tabs并更新title
      return tabs;
    },
  },
});
