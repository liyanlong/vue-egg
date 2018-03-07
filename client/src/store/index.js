import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import auth from './modules/auth'
import nav from './modules/nav'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    app,
    auth,
    nav,
    menu
  }
})
