
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
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
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

  User.getPermissions = async function (login) {
    const {permissions} = await User.findOne({
      where: {
        login: login
      },
      attributes: ['permissions']
    });
    return permissions || '';
  }

  /**
   * 通过匹配最相似的用户
   * @param {*} search 
   */
  User.searchUsers = async function (search) {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          {
            login: {
              [Op.like]: `${search}%`
            }
          }, 
          {
            email: {
              [Op.like]: `${search}%`
            }
          }
        ],
      },
      attributes: ['id', 'login', 'name', 'email']
    });
    return users || [];
  }

  // 更新登录时间
  User.prototype.logSignin = function* () {
    yield this.update({ last_login: new Date() });
  }

  return User;
};
