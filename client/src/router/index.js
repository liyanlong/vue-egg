import Vue from 'vue'
import Router from 'vue-router'
import Cookie from 'js-cookie'
import menu, {lazyLoading} from '@/store/modules/menu'
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
  children: [
    {
      path: '',
      name: 'home',
      component: lazyLoading('home')
    },
    ...generateMenuRoutes(menu.state.modules, [])
  ],
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

function generateMenuRoutes (modules, routes) {
  return [].concat.apply(routes, Object.keys(modules).map((moduleKey) => {
    return modules[moduleKey].routes
  }))
}

export default router
