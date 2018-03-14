const AUTH = Symbol('Context#Auth');

module.exports = {

  get auth () {
    return this.getAuth();
  },

  getAuth () {
    if (!this[AUTH]) {
      this[AUTH] = this.session.auth;
    }
    return this[AUTH];
  },
  
  setAuth (val) {
    if (!val) {
      val = null;
    }
    this[AUTH] = this.session.auth = val;
  },

  success (info = {}, localErrMsg = '') {
    const [errCode, errMsg] = this.app.getEnvCodeInfo('success');
    this.body = {
      errCode,
      info,
      errMsg: localErrMsg || errMsg
    };
  },

  error (envCode, localErrMsg = 'Bad Request', info = {}) {
    const [errCode, errMsg] = this.app.getEnvCodeInfo(envCode);
    this.body = {
      errCode,
      info,
      errMsg: localErrMsg || errMsg
    };
  },

  codeThrow(envCode = '', data) {
    const [errCode, errMsg] = this.app.getEnvCodeInfo(envCode);
    this.throw(200, null, {
      errCode,
      errMsg,
      ...data
    })
  }
}
