module.exports = app => {
   app.resources('products', '/api/products', app.controller.system.products);
 };
 