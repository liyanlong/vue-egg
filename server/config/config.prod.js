exports.mysql = {
  clients: {
    system: {
      host: 'localhost',
      port: '3306',
      user: process.env.EGG_MYSQL_SYSTEM_USER,
      password: process.env.EGG_MYSQL_SYSTEM_PASSWORD,
      database: 'db_dev'
    }
  },
  default: {},
  app: true,
  agent: false
};
