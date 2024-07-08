import { RouteRecordRaw } from 'vue-router';
import { dashboard } from '../rank';

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      rank: dashboard,
      icon: 'mdi-view-dashboard',
      roles: ['admin', 'user'],
    },
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
];

export default dashboardRoutes;
