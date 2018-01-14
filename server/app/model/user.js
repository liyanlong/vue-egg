
module.exports = app => {
  const { Op, STRING, BIGINT, INTEGER, TEXT, BOOLEAN, DATE } = app.Sequelize;
  const User = app.model.define('Users', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    login: STRING,
    name: STRING,
    password: STRING,
    email: STRING,
    permissions: TEXT,
    is_activated: BOOLEAN,
    last_login: DATE,
    is_admin: BOOLEAN,    
    created_at: DATE,
    updated_at: DATE
  });

  User.findByLogin = async function (login, password) {
    const user = await User.findOne({
      where: {
        [Op.or]: [{login: login}, {email: login}],
        password: password
      },
      attributes: ['id', 'login', 'name', 'email', 'permissions', 'is_activated', 'is_admin']
    });
    return user;
  }

  User.prototype.logSignin = function* () {
    // yield this.update({ last_sign_in_at: new Date() });
  }

  return User;
};
