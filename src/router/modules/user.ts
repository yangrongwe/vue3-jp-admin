import { RouteRecordRaw } from 'vue-router';
// import { user } from '../rank';

const userRoutes: RouteRecordRaw[] = [
  // {
  //   path: '/user',
  //   name: 'user',
  //   meta: { rank: user, icon: 'mdi-view-dashboard', roles: ['admin', 'user'] },
  //   component: () => import('@/components/EmptyComponent.vue'),
  //   redirect: '/user/list',
  //   children: [
  //     {
  //       path: 'profile',
  //       name: 'UserProfile',
  //       meta: { icon: 'mdi-view-dashboard', unShow: true, roles: ['guest'] },
  //       component: () => import('@/views/user/Profile.vue'),
  //     },
  //     {
  //       path: 'list',
  //       name: 'UserList',
  //       meta: { icon: 'mdi-view-dashboard', unShow: false, roles: ['admin'] },
  //       component: () => import('@/views/user/UserList.vue'),
  //     },
  //   ],
  // },
];

export default userRoutes;
