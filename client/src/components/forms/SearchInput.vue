<template>
  <div class="vg-search-input">
    <div v-show="mini" class="vg-search-container">
      <span class="vg-search-text">{{searchText}}</span>
      <i :class="iconClass" @click="openSearchInput"></i>
    </div>
    <transition name="fade">
      <el-autocomplete
        v-show="!mini"
        ref="search"
        size="small"
        class="inline-input"
        v-model="searchText"
        v-bind="animateProp"
        :trigger-on-focus="false"
        :fetch-suggestions="querySeach"
        @blur="hidenSearchInput"
        @select="handlerSelect"
      ></el-autocomplete>
    </transition>
  </div>
</template>
<script>
  export default {
    props: {
      'suffix': {
        type: Boolean
      },
      'prefix': {
        type: Boolean
      },
      'icon-class': {
        type: String,
        default: 'el-icon-search'
      },
      'remote-url': {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        mini: true,
        searchText: ''
      }
    },
    computed: {
      animateProp () {
        let props = {}
        if (this.suffix) {
          props['suffix-icon'] = this.iconClass
        }
        if (this.prefix) {
          props['prefix-icon'] = this.iconClass
        }
        return props
      }
    },
    methods: {
      querySeach (queryString, callback) {
        let result = [
          {'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号'}
        ]
        callback(result)
      },
      openSearchInput () {
        this.mini = false
        this.$nextTick(() => {
          if (this.$refs.search) {
            this.$refs.search.focus()
          }
        })
      },
      hidenSearchInput () {
        this.mini = true
      },
      handlerSelect (item) {
        this.$emit('search', item)
      }
    }
  }
</script>

<style lang="scss">
$hover-color: #fff;
.vg-search-input {
  position: relative;
  transition: none;
  .vg-search-container {
    outline: none;
    position: absolute;
    right: 0;

  }
  .vg-search-text {
    
    &:hover {
      color: $hover-color;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
