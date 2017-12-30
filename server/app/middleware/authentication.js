module.exports = options => {
  const whiteList = Array.isArray(options['whiteList']) 
    ? options['whiteList']
    : options['whiteList'].split(',');

  return async (ctx, next) => {

    if (ctx.getAuth()) {
      return await next();
    }

    /**
     * 白名单
     * 绕过登录验证
     */ 
    if (whiteList.includes(ctx.url)
    || options.redirect && ctx.url === options.redirect) {
      return await next();
    }
    ctx.cookies.set('islogin', '', {httpOnly: false});    
    if (ctx.acceptJSON) {
      ctx.throw(401, null, {
        errCode: ctx.app.envCode('AUTHORIZED_ERROR'),
        errMsg: '用户登录信息已过期'
      });
    } else {
      options.redirect && ctx.redirect(options.redirect)
    }
  };
};
