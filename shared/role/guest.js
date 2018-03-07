const util = require('./util');

module.exports = util.createRole({
  name: '访客角色',
  code: 'guest',
  desc: '一般用户未登录浏览角色权限',
  permissions: [
    {name: '访问权限', code: 'access', desc: '访问查询'}
  ]
});
