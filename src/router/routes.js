import Login from '@/views/Login.vue';

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  {
    path: '/',
    component: import('@/components/JpLayout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: import('@/views/Dashboard.vue'),
        meta: { roles: ['admin', 'user'] },
      },
      {
        path: '/user/:id',
        name: 'User',
        component: import('@/views/Dashboard.vue'),
      },
      // 其他子路由
    ],
  },
];

export const whiteList = ['/login'];
