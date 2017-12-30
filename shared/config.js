const path = require('path')

// 本地打包路径
const assetsRoot = path.resolve(__dirname, '../assets')

// 打包CDN路径
const assetsBuildRoot = path.resolve(assetsRoot, './public')

// 打包EGG资源
const assetsEggViewRoot = path.resolve(assetsRoot, './view')

const indexTemplate = 'index.html'

module.exports = {
  isEggServer: !!process.env.EGG_SERVER_ENV,
  build: {
    title: '后台',    
    index: [
      // 打包给后台使用， 主要解决 index问题
      path.resolve(assetsEggViewRoot, `./${indexTemplate}`), 
      // 打包给CDN使用
      path.resolve(assetsBuildRoot, `./${indexTemplate}`)
    ],
    indexTemplate: indexTemplate,

    assetsRoot: assetsRoot,
    assetsBuildRoot: assetsBuildRoot,
    assetsEggViewRoot: assetsEggViewRoot,

    // 打包线上path
    assetsPublicPath: '/',

    // 打包静态资源路径
    assetsSubDirectory: 'static',
  },
  dev: {
  }
}
