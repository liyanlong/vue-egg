module.exports = app => {
  const navController = app.controller.nav;
  app.get('/api/nav/menu', navController.menu);
};
