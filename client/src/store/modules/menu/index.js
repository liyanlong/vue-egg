import lazyLoading from './lazyLoading'
import products from './products'
import systems from './systems'

const state = {
  modules: {
    products,
    systems
  }
}

function filterModuleMenus (user, moduleMenus) {
  return moduleMenus
}

const getters = {
  // 一级模块菜单
  moduleMenus (state, getters, rootState) {
    return Object.keys(state.modules).map(moduleKey => {
      return state.modules[moduleKey].moduleMenu
    })
  },

  // 被选中的模块
  activeModule (state, getters, rootState) {
    let path = rootState.route.fullPath
    let activeModule = getters.moduleMenus.find((module) => {
      return path.includes(module['path'])
    })
    return activeModule
  },

  activeModuleIndex (state, getters) {
    let activeModule = getters.activeModule
    if (!activeModule) {
      return '/'
    }
    return activeModule['path']
  },

  activeModuleMenus (state, getters, rootState) {
    let activeModule = getters.activeModule
    if (!activeModule) {
      return []
    }

    // filter user menu
    return filterModuleMenus({}, activeModule['children'])
  },

  activeModuleMenuItem (state, getters, rootState) {
    const path = rootState.route.fullPath
    const activeModuleMenus = getters.activeModuleMenus
    let activeItem = null
    for (let activeModuleMenu of activeModuleMenus) {
      activeItem = (activeModuleMenu.children || []).find(item => path.includes(item.path))
      if (activeItem) {
        break
      }
    }
    return activeItem
  },

  activeModuleMenuItemIndex (state, getters) {
    const activeModuleMenuItem = getters.activeModuleMenuItem
    return activeModuleMenuItem ? activeModuleMenuItem['path'] : ''
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
