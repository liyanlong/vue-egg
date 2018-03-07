module.exports = {
  // 一级导航条
  module: {
    name: 'product',
    path: '/product',
    categories: ['charts', 'forms', 'tables'],
    meta: {
      icon: '', 
      name: '产品与功能', 
      desc: '',
      permission: true
    }
  },
  // 二级菜单栏 当前版本 categories 无路由
  categories: {
    charts: {
      name: 'product-charts',
      items: ['chart', 'advance_chart'],
      meta: {
        icon: '', 
        name: '图形集合', 
        desc: ''
      }
    },
    forms: {
      name: 'product-forms',
      items: ['form'],
      meta: {
        icon: '', 
        name: '图形集合', 
        desc: ''
      }
    },
    tables: {
      name: 'product-tables',
      items: ['table'],
      meta: {
        icon: '', 
        name: 'Table集合', 
        desc: ''
      }
    }
  },
  // 三级功能栏目
  items: {
    chart: {
      name: 'product-chart',
      path: '/product/chart',
      meta: {icon: '', name: '基本图表', desc: ''}
    },
    advance_chart: {
      name: 'product-advance_chart',
      path: '/product/advance_chart',
      meta: {icon: '', name: '高级图表', desc: ''}
    },
    form: {
      name: 'product-form',
      path: '/product/form'
    },
    table: {
      name: 'product-table',
      path: '/product/table'
    }
  }
}