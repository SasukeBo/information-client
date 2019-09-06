import Vue from 'vue'
import fetch from 'unfetch'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
// import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// import config from '@/config.json'

var uri = ''
if (process.env.NODE_ENV === 'development') {
  uri = 'http://localhost:9081/graphql'
} else if (process.env.NODE_ENV === 'production') {
  uri = 'http://info.sasuke.cn/graphql'
}

const httpLink = new HttpLink({
  fetch: fetch,
  uri
})

// 创建 apollo 客户端
const defaultClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient,
  defaultOptions: {
    $query: {
      fetchPolicy: 'no-catch'
    }
  }
})

Vue.use(VueApollo)

export default apolloProvider
