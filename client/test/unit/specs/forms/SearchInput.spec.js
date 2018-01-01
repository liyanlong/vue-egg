import Vue from 'vue'
import SearchInput from '@/components/forms/SearchInput'

describe('SearchInput.vue', () => {
  it('should render correct input', (done) => {
    const Constructor = Vue.extend(SearchInput)
    const vm = new Constructor({
      propsData: {
      }
    }).$mount()
    vm.searchText = 'test'
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('input').value).to.equal('test')
      done()
    })
  })
})
