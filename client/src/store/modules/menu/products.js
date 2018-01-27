import {generateMenu} from './util'

export default generateMenu({
  // 一级导航条
  module: {
    name: 'product',
    path: '/product',
    categories: ['charts', 'forms', 'tables']
  },
  // 二级菜单栏 当前版本无路由
  categories: {
    charts: {
      name: 'product-charts',
      items: ['chart']
    },
    forms: {
      name: 'product-forms',
      items: ['form']
    },
    tables: {
      name: 'product-tables',
      items: ['table']
    }
  },
  // 三级功能栏目
  items: {
    chart: {
      name: 'product-chart',
      path: '/product/chart'
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
})
