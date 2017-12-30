
module.exports = app => {
  const table = 'sopr_system_categories';
  class Categories extends app.Service {

    * all () {
      const db = app.mysql.get('system');
      return yield db.select(table, {
        where: {
          isEnabled: 1
        },
        columns: ['id', 'parentId', 'label', 'name', 'icon', 'description'],
        orders: [['sort', 'desc']]
      });
    }



  }
  return Categories
}