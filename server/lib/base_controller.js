
module.exports = function (app) {

  class BaseController extends app.Controller {
  
    success (info = {}, localErrMsg = '') {
      const [errCode, errMsg] = app.getEnvCodeInfo('success');
      this.ctx.body = {
        errCode,
        info,
        errMsg: localErrMsg || errMsg
      };
    }

    error (name, localErrMsg = 'Bad Request', info = {}) {
      const [errCode, errMsg] = app.getEnvCodeInfo(name);
      this.ctx.body = {
        errCode,
        info,
        errMsg: localErrMsg || errMsg
      };
    }
  }
  return BaseController;
};