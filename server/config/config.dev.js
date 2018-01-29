const dbConfig = require('../../config/database.js');

exports.mysql = {
  default: {},
  app: true,
  agent: false
};

exports.sequelize = dbConfig['development'];
