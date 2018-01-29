const guest = require('./guest');
const publisher = require('./publisher');
const user = require('./user');

const collections = [guest, publisher, user];

const VG_ROLE_PERMISSIONS = Symbol('Role#Permissions');
const VG_ROLES = Symbol('Role#Roles');

module.exports = {

  get roles () {
    if (!this[VG_ROLES]) {
      this[VG_ROLES] = collections.map((role) => {
        const {name, code, desc} = role;
        return {
          name,
          code,
          desc
        };
      });
    }
    return this[VG_ROLES];    
  },

  get permissions () {
    if (!this[VG_ROLE_PERMISSIONS]) {
      this[VG_ROLE_PERMISSIONS] = collections.reduce((permissions, role) => {
        return permissions.concat(role.permissions);
      }, []);
    }
    return this[VG_ROLE_PERMISSIONS];
  }
}
