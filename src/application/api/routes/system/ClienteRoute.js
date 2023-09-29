'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { ClienteController } = controllers;
  const { AuthMiddleware } = middlewares;

  api.get('/clientes', ClienteController.listar);
  api.get('/clientes/empresa/:id', ClienteController.listar);
  api.get('/clientes/:id', ClienteController.mostrar);
  api.post('/clientes/', ClienteController.crear);
  api.put('/clientes/:id', ClienteController.actualizar);
  api.delete('/clientes/:id', ClienteController.eliminar);
  api.get('/tipoDocumento_usuario/:id', ClienteController.findAllTipoDocumentoIdentidad);

  // api.get('/clientes', AuthMiddleware.verificarclientes(['clientes:listar']), ClienteController.listar);
  // api.get('/clientes/:id', AuthMiddleware.verificarclientes(['clientes:listar']), ClienteController.findOne);
  // api.post('/clientes/', AuthMiddleware.verificarclientes(['clientes:crear']), ClienteController.crear);
  // api.put('/clientes/:id', AuthMiddleware.verificarclientes(['clientes:actualizar']), ClienteController.actualizar);
  // api.delete('/clientes/:id', AuthMiddleware.verificarclientes(['clientes:eliminar']), ClienteController.eliminar);

  return api;
};
