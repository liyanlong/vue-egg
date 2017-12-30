const Service = require('egg').Service;

class UserService extends Service {
  async find (uid) {
    const user = await this.ctx.db.query('select * from user where id = ?', uid);
    return user;
  }

  async login (username, password) {
    const {ctx, app} = this;
    const systemClient = app.mysql.get('system');
    const user = await systemClient.query(
      'select * from users where (login = ? or email = ?) and password = ? limit 1',
      [username, username, ctx.helper.md5(password)]
    );
    if (user && user[0]) {
      delete user[0]['passowrd'];
    }
    return user[0];
  }

}

module.exports = UserService;
