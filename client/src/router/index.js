import Vue from 'vue'
import Router from 'vue-router'
import Cookie from 'js-cookie'
import {menuRoutes} from '@/store/modules/menu'
import lazyLoading from '@/utils/lazyLoading'
import Index from '@/pages/index.vue'

import store from '../store'

Vue.use(Router)

// 登录检查
function requiredLogin (to, from, next) {
  const isLogin = !!Cookie.get('islogin')
  if (isLogin) {
    store.dispatch('auth/getInfo')
    .then(() => next())
    .catch(() => {
      next({name: 'error-500'})
    })
  } else {
    next({
      name: 'auth-login',
      query: { redirect: to.fullPath }
    })
  }
}

export const constantRouterMap = [
  {
    name: 'auth-login',
    path: '/auth/login',
    component: lazyLoading('auth/login')
  },
  {
    name: 'auth-logout',
    path: '/auth/logout',
    beforeEnter (to, from, next) {
      store.dispatch('auth/logout')
        .then(() => next({name: 'auth-login'}))
    }
  },
  {
    name: 'error-500',
    path: '/error/500',
    component: lazyLoading('error/500')
  },
  {
    path: '*',
    name: 'error-404',
    component: lazyLoading('error/404')
  }
]

export const requiredLoginRoute = [{
  path: '/',
  component: Index,
  children: generateMenuRoutes(menuRoutes, [{
    path: '',
    name: 'home',
    component: lazyLoading('home')
  }]),
  beforeEnter: requiredLogin
}]

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...constantRouterMap,
    ...requiredLoginRoute
  ]
})

function generateMenuRoutes (menuRoutes, routes) {
  menuRoutes = menuRoutes.filter(routes => routes && routes.length)
  return [].concat.apply(routes, menuRoutes)
}

export default router
