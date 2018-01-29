'use strict';
const crypto = require('crypto');
const permission = require('../../shared/permission');

function md5 (str) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(str);
  return md5sum.digest('hex');
}
// console.log(JSON.stringify(permission.getSelectedAll()))
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      login: 'admin',
      name: '系统管理员',
      password: md5('Admin123'),
      email: '295697141@qq.com',
      permissions: '',
      is_activated: 1,
      is_admin: 1,
      last_login: null,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      login: 'test',
      name: '测试帐号',
      password: md5('Test123'),
      email: '295697141@qq.com',
      permissions: JSON.stringify(permission.getSelectedAll()),
      is_activated: 1,
      is_admin: 0,
      last_login: null,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
