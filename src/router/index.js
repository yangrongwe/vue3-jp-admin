import { createRouter, createWebHistory } from 'vue-router';
import { constantRoutes, whiteList } from './routes';
import { useAuthStore } from '@/store/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const hasRoles = authStore.roles && authStore.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          const roles = authStore.roles;
          authStore.addDynamicRoutes(roles, router); // 确保传递 router 实例
          next({ ...to, replace: true });
        } catch (error) {
          authStore.logout();
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

export default router;
