import { RouteRecordRaw } from 'vue-router';

const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/errors/403.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/errors/404.vue')
  }
];

export default errorRoutes;