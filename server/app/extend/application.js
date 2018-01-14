const sharedEnvCode = require('../../../shared/env/code');

module.exports = {
  getEnvCodeInfo (name) {
    return sharedEnvCode.getInfo(name);
  }
};
