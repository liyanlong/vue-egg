const dbConfig = require('../../config/database.js')['development'];
console.log(dbConfig); process.exit(0);
exports.mysql = {
  clients: {
    system: {
      host: dbConfig['host'],
      port: dbConfig['port'],
      user: dbConfig['username'],
      password: dbConfig['password'],
      database: dbConfig['database']
    }
  },
  default: {},
  app: true,
  agent: false
};

exports.sequelize = {
  dialect: dbConfig['dialect'], // support: mysql, mariadb, postgres, mssql
  database: dbConfig['database'],
  host: dbConfig['host'],
  port: dbConfig['port'],
  username: dbConfig['username'],
  password: dbConfig['password']
}
