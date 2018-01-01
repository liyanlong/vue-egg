const dbConfig = require('../../../database.json');
exports.mysql = {
  clients: {
    system: {
      host: dbConfig['host'],
      port: dbConfig['port'],
      user: dbConfig['user'],
      password: dbConfig['password'],
      database: dbConfig['database']
    }
  },
  default: {},
  app: true,
  agent: false
};
