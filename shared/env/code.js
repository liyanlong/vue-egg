const util = require('../util');
const def = util.def;
const camelCaseToUnderline = util.camelCaseToUnderline;

function addEnvCode (env) {
  let args = Array.prototype.slice.call(arguments, 1);
  for (let i = 0, len = args.length; i < len; i++) {
    let obj = args[i];
    let keys = Object.keys(obj);
    keys.forEach((key) => {
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
  SUCCESS: 0,
  LOGIN_ERROR: 100,
  AUTHORIZED_ERROR: 101,
  REST_CREATE_ERROR: 200,
  REST_READ_ERROR: 201,
  REST_UPDATE_ERROR: 202,
  REST_DELETE_ERROR: 203,
  INVALID_PARAM: 300,
  NETWORK_ERROR: 501
};

const appEnv = {
};

module.exports = {
  envCode: addEnvCode({}, basicEnv, appEnv),
  get (name) {
    name = camelCaseToUnderline(name).toUpperCase();
    return this.envCode[name];
  },
  equal (code, name) {
    return this.get(name) === code
  }
}