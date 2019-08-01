import tag from 'graphql-tag'

function login(app) {
  app.$apollo.mutate({
    mutation: tag`
      mutation loginByPassword(
        $phone: String!
        $password: String!
        $remember: Boolean
      ) {
        loginByPassword(
          phone: $phone
          password: $password
          remember: $remember
        )
      }
    `,
    variables: app.loginForm,
  }).then(({ data: { loginByPassword: r } }) => {
    app.$message({
      type: 'success',
      message: '恭喜！登录成功。'
    })
    app.$router.push({ name: 'main-page' });
    console.log("login success: ", r)
  }).catch(e => {
    app.$message({
      type: 'error',
      showClose: true,
      message: e.message
    })
  })
}

export default {
  login
}
