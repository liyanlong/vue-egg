
const permissions = [
  {name: '发布所有', code: 'publish', desc: '所有功能的发布权限'},
  {name: '取消发布所有', code: 'unpublish', desc: '所有功能的取消发布功能权限'},
];

module.exports = {
  name: '发布者',
  code: 'publisher',
  desc: '发布角色',
  permissions: permissions
};
