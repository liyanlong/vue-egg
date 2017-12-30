const crypto = require('crypto');

module.exports = {
  md5 (str) {
    const md5sum = crypto.createHash('md5');
    md5sum.update(str);
    return md5sum.digest('hex');
  },

  filterObj (obj, filterKeys) {
    const cloneObj = {};
    if (!filterKeys && !Array.isArray(filterKeys)) {
      return Object.assign(cloneObj, obj);
    }
    Object.keys(obj).forEach(key => {
      if(filterKeys.includes(key) && obj.hasOwnProperty(key)) {
        cloneObj[key] = obj[key];
      }
    });
    return cloneObj;
  }
};
