import Vue from 'vue'
import axios from 'axios'

import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import apolloProvider from './apollo-provider';

import '@/assets/css/app.scss';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/theme/index.css';

import '@/tcpClient';
import '@/tcpServer';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  apolloProvider,
  store,
  template: '<App/>'
}).$mount('#app')
