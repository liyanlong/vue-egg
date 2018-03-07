// import products from './products'
// import systems from './systems'
const moduleMenus = []
const menuRoutes = []
const context = require.context('./', false, /[^index|util]\.js$/)

context.keys().forEach(key => {
  const {menus, routes} = context(key).default
  moduleMenus.push(menus)
  menuRoutes.push(routes)
})

const state = {
  moduleMenus
}

/**
 * 过滤模块菜单
 *
 * @param {*} moduleMenus 模块菜单
 * @param {*} permissions 权限数据
 */
function filterModuleMenus (moduleMenus, permissions) {
  function filterItem (item) {
    const code = item['meta']['code']
    return !!permissions[code]
  }
  moduleMenus = moduleMenus.filter((modMenu) => {
    // 如果父组件要求权限
    if (modMenu['meta'] && modMenu['meta']['authority']) {
      return filterItem(modMenu)
    }
    if (modMenu['children']) {
      modMenu['children'] = filterModuleMenus(modMenu['children'], permissions)
    }
    return true
  })
  return moduleMenus
}

const getters = {
  // 一级模块菜单
  moduleMenus (state, getters, rootState, rootGetters) {
    const permissions = rootGetters['auth/permissions']
    return state.moduleMenus.filter(menu => {
      if (menu['meta'] && menu['meta']['authority'] && menu['meta']['code']) {
        const code = menu['meta']['code']
        return !!permissions[code]
      }
      return true
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

  activeModuleMenus (state, getters, rootState, rootGetters) {
    let activeModule = getters.activeModule
    if (!activeModule) {
      return []
    }
    return filterModuleMenus(activeModule['children'], rootGetters['auth/permissions'])
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
  menuRoutes
}
