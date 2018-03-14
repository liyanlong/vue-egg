
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const sharedConfig = require('../../shared/config')
const build = sharedConfig.build

// function csrfSafeMethod (method) {
//   // these HTTP methods do not require CSRF protection
//   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method))
// }

module.exports = {
  build: {
    env: require('./prod.env'),
    index: build.index,
    assetsRoot: build.assetsBuildRoot,
    assetsSubDirectory: build.assetsSubDirectory,
    assetsPublicPath: build.assetsPublicPath,
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        cookieDomainRewrite: {
          // 将服务端的 set-cookie 重写 域名  
          'http://localhost:3000': 'http://localhost:' + process.env.PORT || 8080
        },
        onProxyReq: function (proxyReq, req, res) {
          // add custom header to request
          // proxyReq.setHeader('x-added', 'foobar')
        },
        onProxyRes: function (proxyRes, req, res) {
        },
        hostRewrite: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
