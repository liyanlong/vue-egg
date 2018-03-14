<template>
  <div class="system">
    <h3>用户权限编辑</h3>
    <el-autocomplete
      v-model="searchText"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入用户名"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {user} from '@/api'
export default {
  data () {
    return {
      activeNames: [],
      searchText: ''
    }
  },
  computed: {
    ...mapState({
      'moduleMenus': state => state.menu.moduleMenus
    })
  },
  created () {
    console.log(this.moduleMenus)
  },
  methods: {
    querySearchAsync (queryString, fn) {
      user.getPermissions().then(data => {
      })
    },
    handleSelect (item) {
      console.log(item)
    }
  }
}
</script>
