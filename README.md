# Egg.js + Webpack + Vue 全家桶 + Element-UI

> 企业级 中台管理系统实践

## Install
1. 下载源码
```
  git clone https://github.com/liyanlong/vue-egg
  cd vue-egg

```

2. 配置database.json
```json
{
  "dev": {
    "driver": "mysql",
    "host": "localhost",
    "database": "db_dev",    
    "user": "db_dev",
    "password": "db_dev",
    "multipleStatements": true
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
3. 执行命令
```bash
npm run db-migrate
```

4. 开发模式
```bash
npm run dev
``` 
