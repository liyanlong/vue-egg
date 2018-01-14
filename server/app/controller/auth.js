const {URL} = require('url');

module.exports = app => {

  class AuthController extends app.BaseController {

    * login ()　{
      const {ctx} = this;
      const {username, password} = ctx.request.body;
      const userinfo = yield ctx.service.user.login(username, password);
      if (userinfo) {
        // 快速验证是否登录
        ctx.cookies.set('islogin', 'true', {httpOnly: false});
        ctx.setAuth(userinfo);
        this.success();
      } else {
        this.error('login_error', '用户名或密码登录失败');        
      }
    }

    * logout (ctx) {
      ctx.setAuth(null);
      this.success();
    }

    * info () {
      const {ctx} = this;
      this.success(ctx.getAuth());
    }
  }
  return AuthController;
};
