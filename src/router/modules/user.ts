import { RouteRecordRaw } from 'vue-router';
import { user } from '../rank';
import { $t } from '@/plugins/i18n/i18nUtils';

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    name: 'user',
    meta: {
      title: $t('title.user.manage'),
      rank: user,
      icon: 'mdi-view-dashboard',
      roles: ['admin', 'user'],
    },
    component: () => import('@/components/EmptyComponent.vue'),
    redirect: '/user/list',
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        meta: {
          title: $t('title.user.profile'),
          icon: 'mdi-view-dashboard',
          unShow: true,
          roles: ['guest'],
        },
        component: () => import('@/views/user/Profile.vue'),
      },
      {
        path: 'list',
        name: 'UserList',
        meta: {
          title: $t('title.user.list'),
          icon: 'mdi-view-dashboard',
          unShow: false,
          roles: ['admin'],
        },
        component: () => import('@/views/user/UserList.vue'),
      },
    ],
  },
];

export default userRoutes;
