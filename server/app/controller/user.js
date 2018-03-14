module.exports = app => {
  return class UserController extends app.BaseController {
    * permissions (ctx) {
      const {username = ''} = ctx.request.query;
      if (!username) {
        this.error();
      }
      this.success();
    }
  };
};
