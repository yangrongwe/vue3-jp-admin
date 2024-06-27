import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    roles: [],
  }),
  actions: {
    login(user, roles) {
      this.isAuthenticated = true;
      this.user = user;
      this.roles = roles;
      this.addDynamicRoutes(roles, router);
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.roles = [];
      router.replace('/login');
    },
    addDynamicRoutes(roles, router) {
      // const dynamicRoutes = [
      //   {
      //     path: '/dashboard',
      //     name: 'Dashboard',
      //     component: () => import('@/views/Dashboard.vue'),
      //     meta: { roles: ['admin', 'user'], requiresAuth: true },
      //   },
      // ];
      // dynamicRoutes.forEach((route) => {
      //   if (roles.some((role) => route.meta.roles.includes(role))) {
      //     router.addRoute(route);
      //   }
      // });
      // router.push('/');
    },
  },
});
