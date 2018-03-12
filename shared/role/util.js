function createRole (config) {
  const prefix = 'role.' + config.code + '.';
  const permissions = config.permissions || [];
  for (let i = 0, len = permissions.length; i < len; i++) {
    permissions[i]['code'] = prefix + permissions[i].code;
  }
  config.permissions = permissions;
  return config;
}

module.exports = {
  createRole: createRole
};
