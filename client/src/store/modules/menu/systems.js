import {generateMenu} from './util'

export default generateMenu({
  module: {
    name: 'system',
    path: '/system',
    categories: ['permissions']
  },
  categories: {
    permissions: {name: 'system-permissions', items: ['permission']}
  },
  items: {
    permission: {
      name: 'system-permission',
      path: '/system/permission'
    }
  }
})
