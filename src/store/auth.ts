import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false as boolean,
    user: null,
    role: null,
    menuRoutes: [] as RouteRecordRaw[],
  }),
  // 持久化 自动放到localstorage中
  persist: true,
  actions: {
    login(user, role) {
      this.isAuthenticated = true;
      this.user = user;
      this.role = role;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.role = null;
    },
    setMenuRoutes(routes: RouteRecordRaw[]) {
    
      this.menuRoutes = routes;
      console.log( " this.menuRoutes ",this.menuRoutes )
    },
  },
});
