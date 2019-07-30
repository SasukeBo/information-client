import net from 'net';
import tag from 'graphql-tag'
import config from '@/config.json'

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
    var client = net.createConnection({
      port: config.cloudServer.port,
      host: config.cloudServer.host
    })
    client.on('connect', () => {
      client.write('hello')
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
