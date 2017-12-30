
module.exports = app => {
  const table = 'sopr_system_user_products';
  class Product extends app.Service {

    * findAllByUserName (username) {
      const db = app.mysql.get('system');
      const sql = `
        SELECT b.id, b.categorieId, b.label, b.name, b.icon, b.link, b.description, b.defaultSort, a.customSort
        FROM sopr_system_user_products as a, sopr_system_products as b
        WHERE a.isEnabled = ? AND a.productId = b.id AND a.username = ?
      `;
      const result = yield db.query(sql, [1, username]);
      return result;
    }
  }
  return Product;
};
