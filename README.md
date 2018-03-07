# Egg.js + Webpack + Vue 全家桶 + Element-UI

> 企业级 中台管理系统实践

## Install
1. 下载源码
```
  git clone https://github.com/liyanlong/vue-egg
  cd vue-egg
  npm install
```

2. 配置database.json
```json
{
  "dev": {
    "dialect": "sqlite",
    "storage": "path/to/database.sqlite"
  },
  "test": {
    "driver": "mysql",
    "host": "localhost",
    "database": "db_test",    
    "user": "db_test",
    "password": "db_test",
    "multipleStatements": true
  },
  "prod": {
    "driver": "mysql",
    "user": {"ENV": "PRODUCTION_USERNAME"},
    "password": {"ENV": "PRODUCTION_PASSWORD"}
  }
}
```

3. db迁移命令

```bash
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all

node_modules/.bin/sequelize db:migrate:undo:all
node_modules/.bin/sequelize db:seed:undo:all
```
更多命令：[查看](https://github.com/sequelize/cli)


## 运行
```
  npm run dev
```
