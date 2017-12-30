import Vue from 'vue'
import Router from 'vue-router'
import Cookie from 'js-cookie'
import menu, {lazyLoading} from '@/store/modules/menu'
import Index from '@/pages/index.vue'

import store from '../store'

Vue.use(Router)

// 登录检查
function requireLogin (to, from, next) {
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
  children: [
    {
      path: '',
      name: 'home',
      component: lazyLoading('home')
    },
    ...generateMenuRoutes(menu.state.modules, [])
  ],
  beforeEnter: requireLogin
}]

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...constantRouterMap,
    ...requiredLoginRoute
  ]
})

function generateMenuRoutes (modules, routes) {
  for (let mod of modules) {
    if (mod.topbar) {
      routes.push(mod.topbar)
    }
    if (mod.items) {
      generateItemRoutes(mod.items, routes)
    }
  }
  return routes
}

function generateItemRoutes (items, routes) {
  for (let key of Object.keys(items)) {
    if (items[key]['component']) {
      routes.push(items[key])
    }
  }
}

export default router
