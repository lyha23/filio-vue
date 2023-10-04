export const routes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('/@/views/home/index.vue'),
        meta: {
          title: 'tabbar.home',
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'notfound',
    path: '/notfound',
    component: () => import('/@/views/404/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },

  // 匹配不到重定向会主页
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: '/home',
  },
];

export default routes;
