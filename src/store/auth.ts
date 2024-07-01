import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    role: null,
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
  },
});
