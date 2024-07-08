import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/store/auth';

// モジュールのルートファイルをロードする
const modules = import.meta.glob<{ default: RouteRecordRaw[] }>(
  './modules/*.ts'
);
let routes: RouteRecordRaw[] = [];
async function loadModules() {
  const childrenRoutes: RouteRecordRaw[] = [];
  const promises = Object.keys(modules).map(async (path) => {
    const mod = await modules[path]();
    if (path.includes('auth')) {
      routes.push(...mod.default);
    } else {
      childrenRoutes.push(...mod.default);
    }
  });

  await Promise.all(promises);

  // ランクによるソート
  childrenRoutes.sort((a, b) => {
    const rankA: number = (a.meta?.rank as number) || 0;
    const rankB: number = (b.meta?.rank as number) || 0;
    return rankA - rankB;
  });
  // メインインタフェースメニューの展示のためにルートを保存する。
  localStorage.setItem('menuRoutes', JSON.stringify(childrenRoutes));
  routes.push({
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/components/JpLayout/index.vue'),
    children: childrenRoutes,
  });
}
await loadModules();
// ホワイトリストを設定する
const whiteList = ['/login', '/register'];
// ルートオブジェクトを作成する
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// ルートガードを設定する
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // ログインしているかどうかを判断する
  if (authStore.isAuthenticated) {
    if (to.path === '/login') {
      next();
    } else {
      // ユーザーがURLにアクセスできるかどうかを確認します。
      const role = authStore.user.role as string;
      const roles = to.meta.roles as string[];
      if (roles?.indexOf(role) > -1) {
        next();
      } else {
        // アクセス権がない、アクセス権がないプロンプトボックスをポップアップします。
        alert('アクセスがない!');
        next(false);
      }
    }
  } else {
    // ホワイトリストURLはログインなしでアクセスできます。
    if (whiteList.includes(to.path)) {
      next();
    } else {
      // ログインしていない場合、ホワイトリストにジャンプしてログイン画面に戻らない場合
      next(`/login?redirect=${to.path}`);
    }
  }
});

export default router;
