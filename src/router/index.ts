import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const modules = import.meta.glob<{ default: RouteRecordRaw[] }>(
  './modules/*.ts'
);
let routes: RouteRecordRaw[] = [];

async function loadModules() {
  const childrenRoutes: RouteRecordRaw[] = [];

  const promises = Object.keys(modules).map(async (path) => {
    const mod = await modules[path]();
    if (path.includes('auth')) {
      // 将 login 和 register 等独立处理
      routes.push(...mod.default);
    } else {
      // 其他路由放到 children 中
      childrenRoutes.push(...mod.default);
    }
  });

  await Promise.all(promises);

  // 根据 rank 排序 childrenRoutes
  childrenRoutes.sort((a, b) => {
    const rankA:number = a.meta?.rank as number || 0;
    const rankB:number  = b.meta?.rank as number || 0;
    return rankA - rankB;
  });

  localStorage.setItem('menuRoutes', JSON.stringify(childrenRoutes));

  // 添加 layout 路由，并将 childrenRoutes 作为其子路由
  routes.push({
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/components/JpLayout/index.vue'),
    children: childrenRoutes,
  });
}

await loadModules();

const whiteList = ['/login', '/register'];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    if (to.path === '/login') {
      next();
    } else {
      const role = authStore.user.role as string;
      const roles = to.meta.roles as string[];
      if (roles?.indexOf(role) > -1) {
        next();
      } else {
        // 权没有访问权限
        alert('没有访问权限');
        next(false);
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
