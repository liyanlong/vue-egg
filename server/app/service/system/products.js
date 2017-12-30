
module.exports = app => {
  const table = 'sopr_system_products';
  class Product extends app.Service {

    * find (id) {
      const db = app.mysql.get('system');
      const row = yield db.get(table, {
        id
      });
      return row;
    }

    /**
     * 通过label查询功能info
     * @param {string} label 
     */
    * findByLabel (label) {
      const db = app.mysql.get('system');
      const row = yield db.get(table, {
        label
      });
      return row;
    }


    * all () {
      const db = app.mysql.get('system');
      const result = yield db.select(table, {
        where: {
          isEnabled: 1
        },
        columns: ['id', 'categorieId', 'label', 'name', 'icon', 'link', 'description'],
        orders: [['defaultSort', 'desc']]
      });
      return result;
    }

    * create (data) {
      const ctx = this.ctx;
      const db = app.mysql.get('system');
      const result = yield db.insert(table, {
        ...data,
        createdTime: new Date(),
        updatedTime: new Date()
      });
      return result.affectedRows === 1 ? result.insertId : false;
    }

    * update (data) {
      const ctx = this.ctx;
      const db = app.mysql.get('system');
      const row = {
        ...data,
        updatedTime: new Date()
      };
      const result = yield db.update(table, row);
      return result.affectedRows === 1;
    }

    * destroy (id) {
      const ctx = this.ctx;
      const db = app.mysql.get('system');
      const result = yield db.delete(table, {
        id,
      });
      return result.affectedRows === 1;
    }
  }
  return Product;
};
