'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    id                  : '745034da-06cb-4d98-8fee-4c982adfbb22',
    id_parametro        : '83cf2636-ce74-4ef4-ab17-04c68d8fd89c',
    numero_documento    : '286824029',
    nombre_empresa      : 'MASTERSOFT INFORMATICA S.R.L.',
    nombre_comercial    : 'MASTERSOFT INFORMATICA S.R.L.',
    persona_natural     : null,
    empresa_unipersonal : false,
    direccion_central   : null,
    imagen_url          : null,
    inicio_operaciones  : false,
    estado              : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('sys_empresa', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
