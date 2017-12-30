const getBaseController = require('./lib/base_controller');

module.exports = app => {
  app.config.coreMiddlewares.unshift('errorHandler');
  app.Controller = app.BaseController = getBaseController(app);
};
