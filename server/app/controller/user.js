module.exports = app => {

  return class UserController extends app.BaseController {
    * permissions (ctx) {
      const {username = ''} = ctx.request.query;
      if (!username) {
        return ctx.error('INVALID_PARAM');
      }
      const permissions = yield ctx.service.user.getPermissions(username);
      const auth = ctx.getAuth();
      ctx.success({
        isadmin: auth.is_admin,
        permissions
      });
    }

    * search (ctx) {
      const {search = ''} = ctx.request.query;
      const users = yield ctx.service.user.searchUsers(search);
      ctx.success(users)
    }
  };
};
