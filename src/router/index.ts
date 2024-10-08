import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import { useTabsStore } from '@/store/tabsStore';
import { $t } from '@/plugins/i18n/i18nUtils';

// モジュールのルートファイルをロードする
const modules: Record<string, any> = import.meta.glob('./modules/*.ts', {
  eager: true,
});
let routes: RouteRecordRaw[] = [];
async function loadModules() {
  const childrenRoutes: RouteRecordRaw[] = [];
  const promises = Object.keys(modules).map(async (path) => {
    const mod = await modules[path];
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
    redirect: '/login',
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
  const tabsStore = useTabsStore();
  // ログインしているかどうかを判断する
  if (authStore.isAuthenticated) {
    if (to.path === '/login') {
      authStore.isAuthenticated = false;
      authStore.user = null;
      tabsStore.selectedTab = '/dashboard';
      tabsStore.tabs = [
        {
          value: '/dashboard',
          title: $t('title.dashboard'),
        },
      ];
      next();
    } else {
      // ユーザーがURLにアクセスできるかどうかを確認します。
      const role = authStore.user.role as string;
      const roles = to.meta.roles as string[];
      if (roles?.indexOf(role) > -1) {
        if (tabsStore.selectedTab != to.path) {
          tabsStore.selectedTab = to.path;
        }
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
