module.exports = app => {

  app.role.failureHandler = function(ctx, action) {

    ctx.throw(401, null, {
      errCode: ctx.app.get('authorized_error'),
      errMsg: 'Forbidden, required role: ' + action
    });
  };

  app.role.use('user', ctx => !!ctx.getAuth());
  app.role.use('admin', ctx => !!ctx.getAuth().is_admin);
}
