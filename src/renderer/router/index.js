import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/login/LandingPage').default
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
      path: '*',
      redirect: '/'
    }
  ]
})
