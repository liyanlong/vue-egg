const menu = require('./menu');
const role = require('./role');

const PERMISSSIONS = [menu, role].reduce((permissions, mod) => {
  return permissions.concat(mod.getPermissions());  
}, []);
module.exports = {
  getSelectedAll: function () {
    const selectedCodeList = {};
    for (let permission of PERMISSSIONS) {
      selectedCodeList[permission['code']] = 1;
    }
    return selectedCodeList;
  },
  getAllPermissions: function () {
    return PERMISSSIONS;
  }
}
