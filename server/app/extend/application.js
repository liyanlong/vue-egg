const sharedEnvCode = require('../../../shared/env/code');

module.exports = {
  getEnvCode (name) {
    return sharedEnvCode.get(name);
  }
};
