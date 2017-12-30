
module.exports = app => {
  app.get('/', app.controller.home.index);
  require('./router/auth')(app);
  require('./router/nav')(app);
  require('./router/resource')(app);
};
