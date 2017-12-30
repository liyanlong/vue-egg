import lazyLoading from './lazyLoading'
import products from './products'
import systems from './systems'

const state = {
  modules: [
    products,
    systems
  ],
  cacheMenus: {}
}

function getModuleMenus (categories, items) {
  let menus = []
  for (let categorie of categories) {
    let menu = {
      id: categorie['id'],
      name: categorie['name'],
      meta: categories['meta'] || {}
    }
    menu.children = categorie.items.map((name) => {
      return items[name]
    }).filter((item) => {
      return item != null
    })

    if (menu.children.length) {
      menus.push(menu)
    }
  }
  return menus
}

const getters = {
  // 模块入口
  topbarModules (state) {
    const _topbars = []
    for (let mod of state.modules) {
      _topbars.push(mod.topbar)
    }
    return _topbars
  },

  // 被选中的模块
  activeModule (state, getters, rootState) {
    let path = rootState.route.fullPath
    let activeModule = state.modules.find((module) => {
      return path.includes(module['topbar']['path'])
    })
    return activeModule
  },
  activeModuleIndex (state, getters) {
    let activeModule = getters.activeModule
    if (!activeModule) {
      return '/'
    }
    return activeModule['topbar']['path']
  },

  activeModuleMenus (state, getters) {
    let activeModule = getters.activeModule
    if (!activeModule) {
      return []
    }
    // get active moudle name
    let moduleName = activeModule['topbar']['name']
    if (!state.cacheMenus[moduleName]) {
      state.cacheMenus[moduleName] = getModuleMenus(
        activeModule['categories'] || [],
        activeModule['items'] || {}
      )
    }
    return state.cacheMenus[moduleName]
  },
  activeModuleMenuItem (state, getters, rootState) {
    let path = rootState.route.fullPath
    let activeModuleMenus = getters.activeModuleMenus
    for (let activeModuleMenu of activeModuleMenus) {
      let activeItem = (activeModuleMenu.children || []).find((item) => {
        return path.includes(item.path)
      })
      if (activeItem) {
        return activeItem
      }
    }
    return null
  },
  activeModuleMenuItemIndex (state, getters) {
    let activeModuleMenuItem = getters.activeModuleMenuItem
    if (!activeModuleMenuItem) {
      return ''
    }
    return activeModuleMenuItem['path']
  }
}

const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export {
  lazyLoading
}
