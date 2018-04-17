module.exports = app => {

  const userController = app.controller.user;
  app.get('/api/user/permissions', userController.permissions);
  app.get('/api/user/search', userController.search);

};
