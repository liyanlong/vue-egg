'use strict';
const crypto = require('crypto');

function md5 (str) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(str);
  return md5sum.digest('hex');
}

const permissions = {
  'user.add': 1,
  'permission.add': 1,

};


module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      login: 'admin',
      name: '系统管理员',
      password: md5('Admin123'),
      email: '295697141@qq.com',
      permissions: JSON.stringify(permissions)
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
