import lazyLoading from './lazyLoading'
const getMeta = require('shared/menu').getMeta

/**
 * @param {*} itemConfig 选项Item 配置
 * @param {*} index 是否为index
 *
 * @return {Object}
 */
function createItem (itemConfig, index = false) {
  const metaName = itemConfig['name'].replace(/-/g, '.')
  const item = {
    ...itemConfig,
    name: itemConfig['name'],
    meta: getMeta(metaName)
  }
  if (itemConfig['path']) {
    item['path'] = itemConfig['path']
    item['component'] = lazyLoading(itemConfig['path'], index)
  } else {
    item['path'] = itemConfig['name'].replace(/-/g, '/')
  }
  return item
}

function createRoutes (config) {
  function getRoute (item) {
    return {
      name: item['name'],
      path: item['path'],
      component: item['component'],
      meta: item['meta']
    }
  }

  const routes = Object.keys(config['items']).map(itemKey => getRoute(config['items'][itemKey]))

  routes.unshift(getRoute(config['module']))
  return routes
}

/**
 * 三级模块层级关系
 *
 * @param {Object} categories 组别概念
 *
 * @return {Array}
 */
function createModuleMenu (config) {
  function extend (obj) {
    return Object.assign(Object.create(null), obj)
  }

  const moduleMenu = extend(config['module'])

  moduleMenu.children = (moduleMenu['categories'] || []).map(categorieKey => {
    if (!config['categories'][categorieKey]) {
      return null
    }
    const categorieMenu = extend(config['categories'][categorieKey])
    categorieMenu.children = (categorieMenu['items'] || [])
      .map(itemKey => extend(config['items'][itemKey]))
      .filter(itemMenu => !!itemMenu)
    return categorieMenu
  }).filter(categorieMenu => categorieMenu && categorieMenu.children && categorieMenu.children.length > 0)

  return moduleMenu
}

export function generateMenu (config) {
  // module menu
  config.module = createItem(config.module, true)

  // categories menu
  Object.keys(config.categories).forEach(key => {
    config.categories[key] = createItem(config.categories[key])
  })

  // items menu
  Object.keys(config.items).forEach(key => {
    config.items[key] = createItem(config.items[key])
  })

  // create Routes
  const routes = createRoutes(config)

  // create moduleMenu
  const moduleMenu = createModuleMenu(config)
  return {
    routes,
    moduleMenu,
    config
  }
}
