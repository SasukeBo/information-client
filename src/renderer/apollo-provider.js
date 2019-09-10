import Vue from 'vue'
import fetch from 'unfetch'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

var uri = ''
if (process.env.NODE_ENV === 'development') {
  uri = 'http://localhost:9081/graphql'
} else if (process.env.NODE_ENV === 'production') {
  uri = 'http://info.protron.com/graphql'
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
