
module.exports = app => {

  return class NavController extends app.BaseController {
    * menu (ctx) {
      return [];
    }
  };
}