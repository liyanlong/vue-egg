module.exports = app => {
 
  const authController = app.controller.auth;

  app.post('/api/auth/login', authController.login);
  app.post('/api/auth/logout', authController.logout);

  app.get('/api/auth/info', authController.info);  
};
