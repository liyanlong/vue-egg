const util = require('../util');
const def = util.def;
const camelCaseToUnderline = util.camelCaseToUnderline;

function addEnvCode (env) {
  var arr = Array.prototype.slice.call(arguments, 1);
  for (var i = 0, len = arr.length; i < len; i++) {
    var obj = arr[i];
    var keys = Object.keys(obj);
    keys.forEach(function (key) {
      if (obj && obj.hasOwnProperty(key)) {
        if (env[key] === undefined) {
          env[key] = obj[key];
        } else {
          throw new Error('addEnvCode() Error, already has exists the same code env');
        }
      }
    });
  }
  return env;
}

const basicEnv = {
  SUCCESS: [0, '请求成功'],
  LOGIN_ERROR: [100, '登录失败'],
  LOGIN_AUTHORIZED_ERROR: [101, '用户登录信息已过期'],
  ACTIVATED_ERROR: [102, '用户被禁止冻结'],
  REST_CREATE_ERROR: 200,
  REST_READ_ERROR: 201,
  REST_UPDATE_ERROR: 202,
  REST_DELETE_ERROR: 203,
  INVALID_PARAM: [300, '请求参数格式不正确'],
  NETWORK_ERROR: 501
};

const appEnv = {};

module.exports = {
  envCode: addEnvCode({}, basicEnv, appEnv),
  get: function (name) {
    name = camelCaseToUnderline(name).toUpperCase();
    const errCode = this.envCode[name][0];
    const errMsg = this.envCode[name][1];
    return {
      errCode: errCode,
      errMsg: errMsg
    }
  },
  equalCode: function (code, name) {
    const errInfo = this.get(name)
    return errInfo['errorCode'] === code
  }
}
module.exports = {
  envCode: addEnvCode({}, basicEnv, appEnv),
  getInfo: function (name) {
    name = camelCaseToUnderline(name).toUpperCase();
    return Array.isArray(this.envCode[name]) ? this.envCode[name] : [this.envCode[name], 'ENOTDEFINED'];
  },
  getErrCode: function (name) {    
    const info = this.getInfo(name);
    const errCode = info[0];
    
    return errCode;
  },
  getErrMsg: function (name) {
    const info = this.getInfo(name);
    return info[1];
  },
  equalCode: function (name, code) {
    return this.getErrCode(name) === code;
  }
}