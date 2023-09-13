'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { EmpresaController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/empresa', AuthMiddleware.verificarPermisos(['empresa:listar']), EmpresaController.listar);
  api.get('/empresa/:id', AuthMiddleware.verificarPermisos(['empresa:listar']), EmpresaController.findOne);
  api.put('/empresa/:id', AuthMiddleware.verificarPermisos(['empresa:actualizar']), EmpresaController.actualizar);
  api.delete('/empresa/:id', AuthMiddleware.verificarPermisos(['empresa:eliminar']), EmpresaController.eliminar);

  return api;
};
