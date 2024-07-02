import { RouteRecordRaw } from 'vue-router';

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    name: 'user',
    icon:'mdi-view-dashboard',
    meta: { roles: ['admin', 'user'] },
    children:[
      {
        path: '/profile',
        name: 'UserProfile',
        icon:'mdi-view-dashboard',
        component: () => import('@/views/user/Profile.vue'),
      },
      {
        path: '/list',
        name: 'UserList',
        icon:'mdi-view-dashboard',
        unShow:true,
        component: () => import('@/views/user/UserList.vue'),
      }
    ]
  }
];

export default userRoutes;