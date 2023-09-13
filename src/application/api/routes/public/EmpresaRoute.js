'use strict';

module.exports = function setupSocio (api, controllers, middlewares) {
  const { EmpresaController } = controllers;

  api.post('/empresa', EmpresaController.crear);

  return api;
};
