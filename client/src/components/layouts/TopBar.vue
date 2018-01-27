<template>
  <el-menu
    class="el-menu--navbar"
    mode="horizontal"
    background-color="#373741"
    text-color="#fff"
    active-text-color="#ffd04b"
    menu-trigger="click"
    :default-active="activeIndex"
    @select="handleSelect">
    <li class="el-menu-item__logo">
      <slot id="logo">
        <span>VUE-EGG</span>
      </slot>
    </li>
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item :index="mod.path" v-for="mod in modules" :key="mod.name">
      {{mod.meta && mod.meta.name}}
    </el-menu-item>
    <slot name="right"></slot>
  </el-menu>
</template>

<script>
  export default {
    props: {
      modules: {
        type: Array,
        default () {
          return []
        }
      },
      activeIndex: {
        type: String,
        default: '/'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        this.$emit('route-select', key, keyPath)
      }
    }
  }
</script>

<style>

.el-menu-item__logo {
  display: flex;
  float: left;
  text-align: left;
  width: 200px;
  height: 60px;
  line-height: 60px;
  margin: 0;
  cursor: pointer;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.el-menu-item__logo:focus {
  outline: none;
}

.el-menu-item__logo a,.el-menu-item__logo img{
  height: inherit;
  vertical-align: initial;
}

.el-menu-item__logo span{
  color: #fff;
  height: 60px;
  line-height: 60px;
  display: block;
  width: inherit;
  text-align: center;
}

.el-menu--navbar .el-submenu .el-menu-item {
  width: auto;
  min-width: initial;
}

</style>
