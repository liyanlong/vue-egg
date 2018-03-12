var webpackConfig = require('../../build/webpack.test.conf')

module.exports = {
  // to run in additional browsers:
  // 1. install corresponding karma launcher
  //    http://karma-runner.github.io/0.13/config/browsers.html
  // 2. add it to the `browsers` array below.
  browsers: ['PhantomJS'],
  frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
  reporters: ['spec', 'coverage'],
  files: [
    '../../../node_modules/babel-polyfill/dist/polyfill.js',
    './index.js',
  ],
  preprocessors: {
    './index.js': ['webpack', 'sourcemap'],
  },
  webpack: webpackConfig,
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    dir: './coverage',
    reporters: [
      { type: 'lcov', subdir: '.' },
      { type: 'text-summary' }
    ]
  }
}