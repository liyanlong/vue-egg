const path = require('path');
const sharedConfig = require('../../shared/config');
const dbConfig = require('../../config/database.js');

function getDbConfig (config, env) {
  const envAdapter = {
    'local': 'development',
    'test': 'test',
    'prod': 'production'
  };
  return config[envAdapter[env]];
}

module.exports = appInfo => {
  return {
    keys: 'vue-egg-server',
    middleware: ['authentication'],
    notfound: {
      pageUrl: '/error/404.html'
    },
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.nj': 'nunjucks',
        '.html': 'nunjucks'
      },
      // 模板目录位置
      root: `${sharedConfig.build.assetsEggViewRoot},${path.resolve(appInfo.baseDir, './app/view')}`
    },
    static: {
      prefix: '/',
      dir: [
        sharedConfig.build.assetsBuildRoot,
        path.resolve(appInfo.baseDir, 'app/public')
      ]
    },
    security: {
      csrf: {
        enable: appInfo.env === 'prod',
        ignoreJSON: true,
        cookieName: '__csrfToken',
        sessionName: '__csrfToken',
        headerName: 'X-XSRF-TOKEN'
      }
    },
    session: {
      key: 'vue-egg:sess',
      httpOnly: true,
      encrypt: true,
      signed: true
    },
    authentication: {
      whiteList: ['/', '/api/auth/login'],
      redirect: '/'
    },
    errorHandler: {
      match: '/api'
    },
    sharedConfig: sharedConfig,
    sequelize: getDbConfig(dbConfig, appInfo.env)
  }
};