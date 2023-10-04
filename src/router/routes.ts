export const routes = [
  {
    path: '/',
    redirect: '/notfound',
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
      {
        name: 'about',
        path: 'about',
        component: () => import('/@/views/about/index.vue'),
        meta: {
          title: 'tabbar.about',
          keepAlive: true,
        },
      },
      {
        name: 'administrator',
        path: 'administrator',
        component: () => import('/@/views/administrator/index.vue'),
        meta: {
          title: 'tabbar.administrator',
          keepAlive: true,
        },
      },
      {
        name: 'onlinePrint',
        path: 'onlinePrint',
        component: () => import('/@/views/onlinePrint/index.vue'),
        meta: {
          title: 'tabbar.onlinePrint',
          keepAlive: true,
        },
      },
      {
        name: 'userHistoryShow',
        path: 'userHistoryShow',
        component: () => import('/@/views/userHistoryShow/index.vue'),
        meta: {
          title: 'tabbar.userHistoryShow',
          keepAlive: true,
        },
      },
      {
        name: 'userMsg',
        path: 'userMsg',
        component: () => import('/@/views/userMsg/index.vue'),
        meta: {
          title: 'tabbar.userHistoryShow',
          keepAlive: true,
        },
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('/@/views/login/index.vue'),
        meta: {
          title: '',
          keepAlive: true,
        },
      },
      {
        name: 'resign',
        path: 'resign',
        component: () => import('/@/views/resign/index.vue'),
        meta: {
          title: '',
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/user',
    redirect: '/user/[:id]',
    children: [
      {
        path: '/[:id]',
        meta: {
          keepAlive: true,
        },
      },
      {
        name: 'userCenter',
        path: 'center',
        component: () => import('/@/views/user/center/index.vue'),
        meta: {
          title: '个人中心',
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
    redirect: '/Home',
  },
];

export default routes;
