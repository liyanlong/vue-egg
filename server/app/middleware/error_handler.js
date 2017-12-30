module.exports = options => {

  return async (ctx, next) => {
    try {
      await next();
      // 404 交给 catch 处理
      if (ctx.status === 404) {
        ctx.throw(404);
      }
    } catch (err) {
      const status = err.status || 500;
      if (status >= 500) {
        // 所有的服务端
        // 异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        ctx.app.emit('error', err, ctx);
      }
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // 错误统一输出内容
      ctx.body = {
        status,
        error,
        errCode: err.errCode,
        errMsg: err.msg,
        info: err.info || {}
      };

      // egg-validate 校验 参数异常
      if (status === 422) {
        ctx.body.errCode = ctx.app.getEnvCode('INVALID_PARAM');
        ctx.body.errMsg = '请求参数格式不正确';
        // 错误栈 追加到 info 上
        ctx.body.info.errors = err.errors;
      }
      
      // 设置输出 status code
      ctx.status = status;
    }
  };
};
  