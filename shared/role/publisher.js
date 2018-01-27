
const permissions = [
  {name: '发布', code: 'publish_all', desc: '所有功能的发布权限'},
  {name: '取消发布', code: 'unpublish_all', desc: '所有功能的取消发布功能权限'}
];

module.exports = {
  name: '发布者',
  code: 'publisher',
  permissions: permissions,
  defaultPermissions: ['publish_all', 'unpublish_all']
};
