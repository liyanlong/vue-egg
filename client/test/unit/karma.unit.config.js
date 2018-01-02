// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var base = require('./karma.base.config.js')
module.exports = function (config) {
  config.set(Object.assign(base, {
    singleRun: true
  }))
}
