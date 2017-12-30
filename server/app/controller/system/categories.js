
module.exports = app => {
  return class CategoriesController extends app.BaseController {

    * index (ctx) {
      const categories = yield ctx.service.system.categories.all();
      this.success({
        categories
      });
    }

    * create (ctx) {
    }

    * update (ctx) {
    }

    * destroy (ctx) {
    }
  }
}
