import Vue from 'vue'
import '@/styles/index.scss'
import '@/plugin'

Vue.config.productionTip = false

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
// const sharedContext = require.context('../../../shared', true, /^\.\/(?!main(\.js)?$)/)
// const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
// sharedContext.keys().forEach(sharedContext)
// srcContext.keys().forEach(srcContext)

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec\.js$/)
testsContext.keys().forEach(testsContext)
