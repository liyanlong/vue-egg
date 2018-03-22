const {URL} = require('url');

module.exports = app => {

  class AuthController extends app.BaseController {

    * login ()　{
      const {ctx} = this;
      const {username, password} = ctx.request.body;
      const userInfo = yield ctx.service.user.login(username, password);
      if (userInfo) {
        // 快速验证是否登录
        ctx.cookies.set('islogin', 'true', {httpOnly: false});
        ctx.setAuth(userInfo);
        ctx.success();
      } else {
        ctx.error('login_error', '用户名或密码登录失败');        
      }
    }

    * logout (ctx) {
      ctx.setAuth(null);
      ctx.success();
    }

    * info () {
      const {ctx} = this;
      ctx.success(ctx.getAuth());
    }
  }
  return AuthController;
};
