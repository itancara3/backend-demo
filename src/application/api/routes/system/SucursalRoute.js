'use strict';

module.exports = function setupSucursal (api, controllers, middlewares) {
  const { SucursalController } = controllers;
  const { AuthMiddleware } = controllers;

  api.get('/sucursales', SucursalController.listar);
  api.get('/sucursales/empresa/:id', SucursalController.listarPorEmpresa);
  api.get('/sucursales/:id', SucursalController.mostrar);
  api.post('/sucursales', SucursalController.crear);
  api.put('/sucursales/:id', SucursalController.actualizar);
  api.delete('/sucursales/:id', SucursalController.eliminar);

  return api;
};
