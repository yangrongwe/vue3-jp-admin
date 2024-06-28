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
      next();
    } else {
      const role = authStore.role;
      if (to.meta.roles.indexOf(role) > -1) {
        next();
      } else {
        // 权没有访问权限
        alert('没有访问权限');
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
