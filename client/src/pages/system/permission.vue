<template>
  <div class="system">
    <h3>用户权限编辑</h3>
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
