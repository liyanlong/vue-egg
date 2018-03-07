import lazyLoading from '@/utils/lazyLoading'

/**
 * @param {*} itemConfig 选项Item 配置
 * @param {*} index 是否为index入口
 *
 * @return {Object}
 */
function createItem (itemConfig, index = false) {
  const item = {
    ...itemConfig
  }
  item['meta'] = item['meta'] || {}
  if (itemConfig['path']) {
    item['path'] = itemConfig['path']
    item['component'] = lazyLoading(itemConfig['path'], index)
  } else {
    item['path'] = itemConfig['name'].replace(/-/g, '/')
  }
  return item
}

function getRoute (item) {
  const {name, path, component, meta} = item
  return {
    name,
    path,
    component,
    meta
  }
}

function createRoutes (config) {
  const routes = Object.keys(config['items']).map(itemKey => getRoute(config['items'][itemKey]))
  // 模块入口
  routes.unshift(getRoute(config['module']))
  return routes
}

/**
 * 三级模块层级关系
 *
 * @return {object}
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
    // 模块对应的分类
    const categorieMenu = extend(config['categories'][categorieKey])

    // 分类对应的 item项
    categorieMenu.children = (categorieMenu['items'] || [])
      .map(itemKey => extend(config['items'][itemKey]))
      .filter(itemMenu => !!itemMenu)

    return categorieMenu
  }).filter(categorieMenu => categorieMenu && categorieMenu.children && categorieMenu.children.length)

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

  return {
    // create Routes
    routes: createRoutes(config),
    // create moduleMenu
    menus: createModuleMenu(config),
    config
  }
}
