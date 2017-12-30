import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store'

import plugin from './plugin'

Vue.config.productionTip = false

Vue.use(plugin)

sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
