import { RouteRecordRaw } from 'vue-router';
import { dashboard, components, methods } from '../rank';
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
    component: () => import('@/views/dashboard/index.vue'),
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      title: $t('title.components.manage'),
      rank: components,
      icon: ' mdi-animation',
      roles: ['admin', 'user'],
    },
    component: () => import('@/components/EmptyComponent.vue'),
    redirect: '/components/table',
    children: [
      {
        path: 'table',
        name: 'table',
        meta: {
          title: $t('title.components.table'),
          icon: 'mdi-table',
          unShow: false,
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/componentsDemo/table/index.vue'),
      },
      {
        path: 'form',
        name: 'form',
        meta: {
          title: $t('title.components.form'),
          icon: 'mdi-list-box',
          unShow: false,
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/componentsDemo/form/index.vue'),
      },
      {
        path: 'pdf',
        name: 'pdf',
        meta: {
          title: $t('title.components.pdf'),
          icon: 'mdi-file-pdf-box',
          unShow: false,
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/componentsDemo/pdf/index.vue'),
      },
      {
        path: 'alert',
        name: 'alert',
        meta: {
          title: $t('title.components.alert'),
          icon: 'mdi-file-pdf-box',
          unShow: false,
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/componentsDemo/alert/index.vue'),
      },
      {
        path: 'modal',
        name: 'modal',
        meta: {
          title: $t('title.components.modal'),
          icon: 'mdi-file-pdf-box',
          unShow: false,
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/componentsDemo/alert/index.vue'),
      },
    ],
  },
  {
    path: '/methods',
    name: 'methods',
    meta: {
      title: $t('title.methods.manage'),
      rank: components,
      icon: 'mdi-calendar-sync-outline',
      roles: ['admin', 'user'],
    },
    component: () => import('@/components/EmptyComponent.vue'),
    redirect: '/methods/table',
    children: [
      {
        path: 'time',
        name: 'time',
        meta: {
          title: $t('title.methods.time'),
          icon: 'mdi-clock-time-eight',
          unShow: false,
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/user/Profile.vue'),
      },
      {
        path: 'text',
        name: 'text',
        meta: {
          title: $t('title.methods.text'),
          icon: 'mdi-text-shadow',
          unShow: false,
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/user/Profile.vue'),
      },
      {
        path: 'money',
        name: 'money',
        meta: {
          title: $t('title.methods.money'),
          icon: 'mdi-cash',
          unShow: false,
          roles: ['admin', 'user'],
        },
        component: () => import('@/views/user/Profile.vue'),
      },
    ],
  },
];

export default mainMenuRoutes;
