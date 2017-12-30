
module.exports = app => {
  const sharedConfig = app.config.sharedConfig;

  class HomeController extends app.BaseController {
  
    * index() {
      const {ctx} = this
      yield ctx.render(sharedConfig.build.indexTemplate);
    }
  }
  return HomeController;
};
