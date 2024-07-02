import { RouteRecordRaw } from 'vue-router';

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: () => import('@/views/user/Profile.vue'),
    meta: { roles: ['admin', 'user'] }
  }
];

export default userRoutes;