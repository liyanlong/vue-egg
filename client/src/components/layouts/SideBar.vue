<template>
  <div class="app-sidebar">
    <div class="app-sidebar-toggle-btn"></div>
    <el-menu
      class="el-menu-vertical-sidebar app-sidebar-inner" 
      background-color="#373741"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen" 
      @close="handleClose"
      :router="true"
      :default-active="activeIndex"
      menu-trigger="click">
      <sub-menu :subMenu="subMenu" v-for="subMenu in menus" :key="subMenu.name"></sub-menu>
    </el-menu>
  </div>
</template>

<script>
import SubMenu from './SubMenu.vue'
export default {
  props: {
    searchPlaceholder: {
      type: String,
      default: '请输入查询内容'
    },
    menus: {
      type: Array,
      default () {
        return []
      }
    },
    activeIndex: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      collapsed: false,
      searchText: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleIconClick (e) {
      this.$emit('search', e)
    }
  },
  components: {
    SubMenu
  }
}
</script>

<style>
  .app-sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 200px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  
  .el-menu-vertical-sidebar {
    text-align: left;
  }
  
  .el-menu-vertical-sidebar .el-submenu__icon-arrow {
    right: 40px;
  }

  .app-sidebar-inner {
    width: 220px;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }
  
  .el-menu-vertical-sidebar .el-submenu .el-menu-item {
    min-width: initial;
  }

  .el-menu-item__autocomplete {
    margin-right: 20px;
    padding: 20px;
  }
</style>
