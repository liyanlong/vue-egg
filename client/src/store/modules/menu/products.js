import {createLazyLoadingFn} from './lazyLoading'
import getMeta from './_meta'

const localLazyLoading = createLazyLoadingFn('product')

export default {
  topbar: {
    name: 'product',
    path: '/product',
    component: localLazyLoading('index'),
    meta: getMeta('product', 'default')
  },
  categories: [
    {id: 'product-charts', name: '数据图表', items: ['chart']},
    {id: 'product-forms', name: '表单', items: ['form']},
    {id: 'product-tables', name: '表格', items: ['table']}
  ],
  items: {
    chart: {
      name: 'product-chart',
      path: '/product/chart',
      component: localLazyLoading('chart'),
      meta: getMeta('product', 'chart')
    },
    form: {
      name: 'product-form',
      path: '/product/form',
      component: localLazyLoading('form'),
      meta: getMeta('product', 'form')
    },
    table: {
      name: 'product-table',
      path: '/product/table',
      component: localLazyLoading('table'),
      meta: getMeta('product', 'table')
    }
  }
}
