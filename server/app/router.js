
module.exports = app => {
  app.get('/', app.controller.home.index);
  require('./router/auth')(app);
  require('./router/user')(app);
  require('./router/resource')(app);
};
