const util = require('./util');

module.exports = util.createRole({
  name: '登录用户',
  code: 'user',
  desc: '一般角色',
  permissions: [
    {name: '设置权限', code: 'settings', desc: '修改个人信息权限'}
  ]
});
