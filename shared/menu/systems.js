module.exports = {
  module: {
    name: 'system',
    path: '/system',
    categories: ['permissions'],
    meta: {
      icon: '', 
      name: '系统',
      desc: ''
    }
  },
  categories: {
    permissions: {
      name: 'system-permissions',
      items: ['permission'],
      meta: {
        icon: '',
        name: '系统权限',
        desc: ''
      }
    }
  },
  items: {
    permission: {
      name: 'system-permission',
      path: '/system/permission',
      meta: {icon: '', name: '权限', desc: ''}
    }
  }
}
