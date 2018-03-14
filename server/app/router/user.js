module.exports = app => {

  const userController = app.controller.user;
  app.get('/api/user/permissions', userController.permissions);

};
