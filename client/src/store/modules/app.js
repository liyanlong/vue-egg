const state = {
  // 侧边栏控制
  sidebar: {
    opened: true,
    hidden: false
  }
}

const getters = {
  sidebarOpened (state, getters, rootState, rootGetter) {
    return state.sidebar.opened && rootGetter['menu/activeModuleMenus'].length > 0
  }
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
