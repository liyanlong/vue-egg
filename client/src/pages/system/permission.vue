<template>
  <div class="system">
    <h3>用户权限编辑</h3>
    <el-collapse v-model="activeNames">
      <el-collapse-item 
        v-for="(mod,index) in modules" 
        :key="index"
        :name="mod.topbar.name"
        :title="mod.topbar.meta.title" 
      >
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      activeNames: []
    }
  },
  computed: {
    ...mapState({
      'modules': state => state.menu.modules
    })
  },
  created () {
    console.log(this.modules)
  }
}
</script>
