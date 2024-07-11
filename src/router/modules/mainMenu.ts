import { RouteRecordRaw } from 'vue-router';
import { dashboard } from '../rank';
import { $t } from '@/plugins/i18n/i18nUtils';

const mainMenuRoutes: RouteRecordRaw[] = [
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
  {
    path: '/user1',
    name: 'user1',
    meta: {
      title: $t('title.user.manage') + 1,
      rank: 3,
      icon: 'mdi-view-dashboard',
      roles: ['admin', 'user'],
    },
    component: () => import('@/components/EmptyComponent.vue'),
    redirect: '/user/list1',
    children: [
      {
        path: 'profile1',
        name: 'UserProfile1',
        meta: {
          title: $t('title.user.profile') + 1,
          icon: 'mdi-view-dashboard',
          unShow: false,
          roles: ['admin'],
        },
        component: () => import('@/views/user/Profile.vue'),
      },
      {
        path: 'list1',
        name: 'UserList1',
        meta: {
          title: $t('title.user.list') + 1,
          icon: 'mdi-view-dashboard',
          unShow: false,
          roles: ['admin'],
        },
        component: () => import('@/views/user/UserList.vue'),
      },
    ],
  },
];

export default mainMenuRoutes;
