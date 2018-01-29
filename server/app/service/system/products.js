
module.exports = app => {
  const table = 'sopr_system_products';
  class Product extends app.Service {

    * find (id) {
    }

    /**
     * 通过label查询功能info
     * @param {string} label 
     */
    * findByLabel (label) {
    }

    * all () {
    }

    * create (data) {
    }

    * update (data) {
    }

    * destroy (id) {
    }
  }
  return Product;
};
