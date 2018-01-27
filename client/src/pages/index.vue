<template>
  <div class="app-layout">
    <top-bar class="app-topbar"
      :modules="moduleMenus" 
      :active-index="activeModuleIndex" 
      @route-select="handlerSelect">
      <div slot="right" class="el_menu__right">
       <li class="el-menu-item el-menu-item__search">
          <search-input suffix/>
       </li> 
       <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
        </el-menu-item>    
        <el-submenu index="/auth">
          <template slot="title">{{username}}</template>
          <el-menu-item index="/auth/logout">退出登录</el-menu-item>
        </el-submenu>
      </div>
    </top-bar>
    <div class="app-body" :class="sidebarOpened ? 'app-sidebar-full' : 'app-sidebar-mini'">
      <transition name="slide-fade">
        <side-bar v-show="sidebarOpened" :menus="activeModuleMenus" :active-index="activeModuleMenuItemIndex"></side-bar>
      </transition>
      <router-view class="app-main"></router-view>
    </div>
  </div>

</template>

<script>
import TopBar from '@/components/layouts/TopBar'
import SideBar from '@/components/layouts/SideBar'
import SearchInput from '@/components/forms/SearchInput'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      moduleMenus: 'menu/moduleMenus',
      activeModuleMenus: 'menu/activeModuleMenus',
      activeModuleIndex: 'menu/activeModuleIndex',
      activeModuleMenuItemIndex: 'menu/activeModuleMenuItemIndex',
      sidebarOpened: 'app/sidebarOpened'
    })
  },
  data () {
    return {
      username: 'Admin',
      searchText: ''
    }
  },
  created () {
    console.log(this.activeModuleMenuItemIndex)
  },
  methods: {
    handlerSelect (key, keyPath) {
      let path = ''
      // 非绝对路径转绝对路径
      if (key.charAt(0) !== '/') {
        path = keyPath.join('/').replace(/(?=\/)\/+/g, '/')
      } else {
        path = key
      }
      this.$router.push(path)
    }
  },
  components: {
    TopBar,
    SideBar,
    SearchInput
  },
  watch: {
    activeModuleMenuItemIndex (val) {
      console.log(val)
    }
  }
}
</script>

<style>
  .app-topbar {
    position: absolute;
    top: 0;
    width: 100%;
  }
  .app-body {
    position: relative;
    top: 60px;
    width: 100%;
    display: flex;    
    height: inherit;
    overflow: hidden;
    box-sizing: border-box;
    transition: all .3s ease;    
  }
  .app-sidebar-full {
    padding-left: 200px;
  }
  .app-sidebar-mini {
    padding-left: 0px;
  }
  .app-sidebar-mini  .app-sidebar {
    left: -200px;
  }
  .app-main {
    position: relative;
    width: 100%;
    padding: 10px;
  }

  .el_menu__right {
    float: right;
  }
  .el_menu__right:focus,.el_menu__right:active{
    outline-color: transparent;
    outline-style: none;
  }
  .el-menu--navbar .el-menu-item__search:focus, .el-menu--navbar .el-menu-item__search:hover {
    background-color: transparent;
    color: #fff;
    transition: none;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;    
  }
  .slide-fade-enter{
    opacity: 0;
    transform: translateX(-200px);
  }
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-200px);    
  }
</style>
