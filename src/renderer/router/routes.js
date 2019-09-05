import router from './index'

export default () => {
  return [
    {
      path: '/auth',
      name: 'auth',
      beforeEnter: denyIfLoggedIn(),
      component: require('@/components/auth').default,
      children: [
        {
          path: 'login',
          name: 'login',
          component: require('@/components/auth/login').default,
        }
      ]
    },
    {
      path: '/main',
      name: 'main-page',
      redirect: { name: 'server-page' },
      component: require('@/components/main/index').default,
      children: [
        {
          path: 'server',
          name: 'server-page',
          component: require('@/components/main/server/index').default,
        },
        {
          path: 'devices',
          name: 'device-page',
          component: require('@/components/main/device/index').default,
        },
        {
          path: 'config',
          name: 'config-page',
          component: require('@/components/main/config/index').default,
        }
      ]
    },
    {
      path: '/*',
      redirect: { name: 'server-page' }
    }
  ]
}

function denyIfLoggedIn() {
  return (to, from, next) => {
    var app = router.app;
    // 如果用户未登录，继续访问
    // 否则返回原页面

    if (app.$store.state.User.uuid) {
      next(from);
    } else {
      app.$store.dispatch('clearUserData');
      next();
    }
  };
}
