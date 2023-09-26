'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de produccion
let items = [
  {
    id                 : '3f75c9c8-5c9e-11ee-8c99-0242ac120002',
    id_empresa         : '745034da-06cb-4d98-8fee-4c982adfbb22',
    nro_sucursal       : 1,
    nombre             : 'Mastersoft',
    descripcion        : 'Consultoria',
    direccion          : '',
    zona               : '',
    ciudad             : 'Cochabamba',
    ciudad_abreviatura : 'Cbba',
    pais               : 'Bolivia',
    email              : '',
    sitio_web          : '',
    telefono           : '',
    fax                : '',
    celular            : '85479625',
    es_fiscal          : true,
    precio_venta       : 0,
    link_map           : '',
    horario            : '',
    estado             : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('sucursal', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
