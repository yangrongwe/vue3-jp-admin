import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { User } from '@/types/index';
function filterRoutesByRole(routes, role: string) {
  return routes
    .filter((route) => !route.meta.roles || route.meta.roles.includes(role))
    .map((route) => {
      if (route.children) {
        route.children = filterRoutesByRole(route.children, role);
      }
      return route;
    });
}
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false as boolean,
    user: null as User,
    menuRoutes: [] as RouteRecordRaw[],
  }),
  persist: true,
  actions: {
    login(user) {
      this.isAuthenticated = true;
      this.user = user;
      this.menuRoutes = JSON.parse(localStorage.getItem('menuRoutes'));
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.menuRoutes = [];
    },
  },
  getters: {
    filteredMenuRoutes: (state) => {
      return filterRoutesByRole(state.menuRoutes, state.user.role);
    },
  },
});
