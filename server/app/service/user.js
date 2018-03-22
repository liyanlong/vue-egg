const Service = require('egg').Service;

class UserService extends Service {
  * find (uid) {
    return {
      uid
    };
  }

  * login (login, password) {
    const {ctx} = this;
    const user = yield ctx.model.User.findByLogin(login, ctx.helper.md5(password));
    if (!user) {
      return null;
    }
    // 用户是否被冻结
    if (user.get('is_activated') == '0') {
      ctx.codeThrow('LOGIN_ACTIVED_ERROR');
    }
    return user;
  }

  * getPermissions(login) {
    const {ctx} = this;
    return yield ctx.model.User.getPermissions(login)
  }

}

module.exports = UserService;
