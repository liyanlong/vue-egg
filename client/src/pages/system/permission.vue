<template>
  <div class="system">
    <el-form :inline="true" :model="form" @submit.native.prevent class="demo-form-inline">
      <el-form-item label="用户">
        <el-autocomplete
          v-model="handleSearch"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入用户名"
          @keyup.native.enter="onSubmit"
          @select="handleSelect">
        </el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>
<script>
import {mapState} from 'vuex'
import {getAllPermissions} from 'shared/permission'
import {user} from '@/api'
export default {
  data () {
    return {
      handleSearch: '',
      form: {
        search: ''
      },
      permissions: []
    }
  },
  computed: {
    ...mapState({
      'moduleMenus': state => state.menu.moduleMenus
    })
  },
  created () {
    this.permissions = getAllPermissions()
  },
  methods: {
    // 查询用户
    querySearchAsync (queryString, cb) {
      user.searchUsers(queryString).then(data => {
        cb(data.info.map(item => {
          return {
            value: `${item['login']} (${item['name']})`
          }
        }))
      }).catch(() => {
        cb && cb(null)
      })
    },
    handleSelect (item) {
      this.form.search = item.login
    },
    onSubmit () {
    }
  }
}
</script>
