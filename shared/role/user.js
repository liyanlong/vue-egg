
const permissions = [
  {name: '编辑', code: 'acess', desc: '发布功能权限'},
  {name: '取消发布', code: 'un_pubish', desc: '取消发布功能权限'}
];

module.exports = {
  name: '访问用户',
  code: 'guest',
  desc: '一般角色',
  permissions: permissions
};
