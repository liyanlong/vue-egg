const menu = require('./menu');
const role = require('./role');

const PERMISSIONS = [menu, role].reduce((permissions, mod) => {
  return permissions.concat(mod.permissions);  
}, []);

module.exports = {
  getSelectedAll () {
    const CODE_LIST = {};
    for (let permission of PERMISSIONS) {
      CODE_LIST[permission['code']] = 1
    }
    return CODE_LIST
  }
}
