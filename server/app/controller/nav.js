
module.exports = app => {

  return class NavController extends app.BaseController {

    * menu (ctx) {
      const username = ctx.auth.username;
      return this.success();

      const [categories, products] = yield [
        ctx.service.system.categories.all(),
        ctx.service.system.userProducts.findAllByUserName(username)
      ];

      // 装载
      categories.forEach(categorie => {
        const items = products.filter(product => {
          return product['categorieId'] === categorie['id']
        }).map(item => {
          return item['label']
        });
        categorie['products'] = items;
      });

      const parentCategories = categories.filter((categorie) => {return categorie['parentId'] === 0});
      parentCategories.forEach((item) => {
        item['categories'] = categories.filter(categorie => {return categorie['parentId'] === item['id']});
      });
      this.success({
        categories: parentCategories.filter(categorie => { return categorie['categories'].length}),
        products
      });
    }


  };
}