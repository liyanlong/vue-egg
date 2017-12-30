<template>
<el-submenu :index="subMenu.id" :key="subMenu.name">
  <template slot="title">
    <span>{{subMenu.name}}</span>
  </template>
  <template v-for="item in subMenu['children']">
    <el-menu-item :index="item.path" :key="item.name">
      {{item.meta.title}}
    </el-menu-item>
  </template>
</el-submenu>
</template>

<script>
export default {
  name: 'SubMenu',
  props: {
    subMenu: {
      type: Object,
      required: true
    }
  }
}
</script>
