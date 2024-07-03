import { RouteRecordRaw } from 'vue-router';

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { rank:1, icon:'mdi-view-dashboard',roles: ['admin', 'user'] },
    component: () => import('@/views/dashboard/Dashboard.vue'),
  }
];

export default dashboardRoutes;