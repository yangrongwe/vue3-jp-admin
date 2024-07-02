import { RouteRecordRaw } from 'vue-router';

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: { roles: ['admin', 'user'] }
  }
];

export default dashboardRoutes;