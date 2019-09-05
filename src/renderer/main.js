import '@/assets/css/app.scss';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/theme/index.css';

import Vue from 'vue'
import apolloProvider from './apollo-provider';

import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);

import axios from 'axios'
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false

import server from '@/socket-server';
import websocket from '@/websocket';
Vue.prototype.$server = server;
Vue.prototype.$websocket = websocket;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

const app = document.querySelector('#app');

if (app) {
  require.ensure([], () => {
    const entry = require('./index.vue').default;
    const store = require('./store/index.js').default;
    const router = require('./router/index.js').default;

    /* eslint-disable no-new */
    new Vue({
      el: app,
      store,
      router,
      apolloProvider,
      render: h => h(entry)
    })
  })
}
