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

  codeThrow(envCode = '') {
    const [errCode, errMsg] = this.app.getEnvCodeInfo(envCode)
    this.throw(200, null, {
      errCode,
      errMsg
    })
  }
}
