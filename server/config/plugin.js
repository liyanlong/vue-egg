// 关闭内置的 i18n 插件
module.exports = {
  i18n: {
    enable: false,
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },
  session: true,
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  userrole: {
    package: 'egg-userrole',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  }
};
