module.exports = options => {

  return async (ctx, next) => {

    if (ctx.getAuth()) {
      return await next();
    }

    ctx.cookies.set('islogin', '', {httpOnly: false});
    ctx.codeThrow('AUTHORIZED_ERROR', {
      info: {
        redirect: options.redirect || '/'
      }
    });
  };
};
