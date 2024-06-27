import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  {
    path: '/',
    component: import('@/components/JpLayout/index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      // 其他子路由
    ],
  },
];

export const whiteList = ['/login'];
