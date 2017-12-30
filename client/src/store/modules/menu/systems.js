import {createLazyLoadingFn} from './lazyLoading'
import getMeta from './_meta'
const localLazyLoading = createLazyLoadingFn('system')

export default {
  topbar: {
    name: 'system',
    path: '/system',
    component: localLazyLoading('index'),
    meta: getMeta('system', 'default')
  },
  categories: [
    {id: 'permissions', name: '权限管理', items: ['permission']}
  ],
  items: {
    permission: {
      name: 'system-permission',
      path: '/system/permission',
      component: localLazyLoading('permission'),
      meta: getMeta('system', 'permission')
    }
  }
}
