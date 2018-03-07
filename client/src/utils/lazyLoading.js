
// lazy loading Components
// https://github.com/vuejs/vue-router/blob/dev/examples/lazy-loading/app.js#L8
export default function (name, index = false) {
  name = name.charAt(0) === '/' ? name.substr(1) : name
  return function () {
    return import(`@/pages/${name}${index ? '/index' : ''}.vue`)
  }
}

export function createLazyLoadingFn (dir) {
  return function (name, index = false) {
    if (name === '' && !index) {
      name = 'index'
    }
    return () => import(`@/pages/${dir}/${name}${index ? '/index' : ''}.vue`)
  }
}
