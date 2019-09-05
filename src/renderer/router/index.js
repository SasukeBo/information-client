import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store';
import currentUserGQL from './query.current-user.gql';

const router = new VueRouter({
  routes: routes()
})

router.beforeEach((to, from, next) => {
  var app = router.app

  if (!store.state.User.uuid) {
    app.$apollo.query({
      query: currentUserGQL,
      fetchPolicy: 'network-only'
    }).then(({ data: { currentUser } }) => {
      app.$store.dispatch('setUser', currentUser)
      if (isAuthPage(from)) {
        // 登录状态下如果是 auth 相关页面则导向 首页
        next({ name: 'server-page' });
      } else {
        next()
      }
    }).catch((e) => {
      if (isAuthPage(to)) {
        next() // 预留 以后可能拓展注册和找回密码功能
      } else {
        next({ name: 'login' })
      }
    })
  } else {
    next()
  }
})

// 如果是 authenticate 相关页面则返回 true
function isAuthPage(toPath) {
  return ['login'].indexOf(toPath.name) > -1
}

export default router
