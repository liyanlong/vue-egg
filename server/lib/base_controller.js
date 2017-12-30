
module.exports = function (app) {

  class BaseController extends app.Controller {
  
    success (info = {}, errMsg = '') {
      this.ctx.body = {
        errCode: app.getEnvCode('success'),
        info,
        errMsg
      };
    }
  
    error (name, errMsg = 'Bad Request', info = {}) {
      this.ctx.body = {
        errCode: app.getEnvCode(name),
        info,
        errMsg
      };
    }
  }
  return BaseController;
};