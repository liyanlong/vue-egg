'use strict';
const permission = require('../../shared/permission');
const crypto = require('../../server/lib/crypto');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      login: 'admin',
      name: '系统管理员',
      password: crypto.md5('Admin123'),
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
      password: crypto.md5('Test123'),
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
