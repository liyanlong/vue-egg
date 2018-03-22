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

  success (info = {}) {
    const [code] = this.app.getEnvCodeInfo('success');
    this.body = {
      code,
      info
    };
  },

  error (envCode, localErrMsg = 'Bad Request', info = {}) {
    const [code, errMsg] = this.app.getEnvCodeInfo(envCode);
    this.body = {
      code,
      info,
      errMsg: errMsg || localErrMsg
    };
  },

  codeThrow(envCode = '', data) {
    const [code, errMsg] = this.app.getEnvCodeInfo(envCode);
    this.throw(200, null, {
      code,
      errMsg,
      ...data
    })
  }
}
