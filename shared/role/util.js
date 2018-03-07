function createRole (config) {
  const prefix = config.code + '.';
  const permissions = config.permissions || [];
  for (let i = 0, len = permissions.length; i < len; i++) {
    permissions[i]['code'] = prefix + permission.code;
  }
  config.permissions = permissions;
  return config;
}

module.exports = {
  createRole: createRole
};
