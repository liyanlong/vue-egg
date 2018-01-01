import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store'

import './styles/index.scss'
import './plugin'

Vue.config.productionTip = false

sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
