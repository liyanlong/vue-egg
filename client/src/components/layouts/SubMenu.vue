<template>
<el-submenu v-if="menuItem.children" :index="menuItem.path">
  <template slot="title">
    <span>{{menuItem.meta && menuItem.meta.name || menuItem.name}}</span>
  </template>
  <sub-menu v-for="item in menuItem.children" :menu-item="item" :key="item.name"></sub-menu>
</el-submenu>
<el-menu-item v-else :index="menuItem.path">
  {{menuItem.meta && menuItem.meta.name || menuItem.name}}
</el-menu-item>
</template>

<script>
export default {
  name: 'SubMenu',
  props: {
    menuItem: {
      type: Object,
      required: true
    }
  }
}
</script>
