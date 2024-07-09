import { RouteRecordRaw } from 'vue-router';
import { dashboard } from '../rank';
import { $t } from '@/plugins/i18n/i18nUtils';

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: $t('title.dashboard'),
      rank: dashboard,
      icon: 'mdi-view-dashboard',
      roles: ['admin', 'user'],
    },
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
];

export default dashboardRoutes;
