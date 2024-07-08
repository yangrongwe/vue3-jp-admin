import { RouteRecordRaw } from 'vue-router';

const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/403',
    name: 'Forbidden',
    meta: { unShow: true },
    component: () => import('@/views/errors/403.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { unShow: true },
    component: () => import('@/views/errors/404.vue'),
  },
];

export default errorRoutes;
