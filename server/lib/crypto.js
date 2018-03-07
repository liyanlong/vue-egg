const crypto = require('crypto');

function md5 (str) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(str);
  return md5sum.digest('hex');
}

module.exports = {
  md5: md5
};
