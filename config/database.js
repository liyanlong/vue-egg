
module.exports = {
  "development": {
    "username": "db_dev",
    "host": "127.0.0.1",
    "port": "3306",
    "database": "db_dev", 
    "password": "db_dev",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "host": "127.0.0.1",
    "database": "db_dev", 
    "password": "db_dev",
    "dialect": "mysql"
  },
  "production": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql'
  }
}