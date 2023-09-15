'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    id              : '6190597f-7fa6-4c39-bcc9-7a1441ba566a',
    nombre          : 'Dashboard',
    ruta            : 'dashboard',
    icono           : 'dashboard',
    orden           : 1,
    id_menu_permiso : null,
    estado          : 'ACTIVO'
  },
  {
    id              : '039a897a-76dd-44c1-b3d7-9682df8f5342',
    nombre          : 'Administracion',
    ruta            : 'administracion',
    icono           : 'folder_open',
    orden           : 2,
    id_menu_permiso : null,
    estado          : 'ACTIVO'
  },
  {
    id              : '61d6d53b-ac65-41ac-bc54-3228f548f40a',
    nombre          : 'Productos',
    ruta            : 'productos',
    icono           : 'medication',
    orden           : 3,
    id_menu_permiso : null,
    estado          : 'ACTIVO'
  },
  {
    id              : 'ef6b99d0-0834-4d1e-86b0-207111744f98',
    nombre          : 'Compras',
    ruta            : 'compras',
    icono           : 'shopping_bag',
    orden           : 4,
    id_menu_permiso : null,
    estado          : 'ACTIVO'
  },
  {
    id              : '6dc27435-bb49-48c8-b98d-ed9024d10ec5',
    nombre          : 'Ventas',
    ruta            : 'ventas',
    icono           : 'shopping_cart',
    orden           : 5,
    id_menu_permiso : null,
    estado          : 'ACTIVO'
  },
  {
    id              : 'a0882ff9-0d95-4d60-835d-85624f7a3469',
    nombre          : 'Inventarios',
    ruta            : 'inventarios',
    icono           : 'inventory',
    orden           : 6,
    id_menu_permiso : null,
    estado          : 'ACTIVO'
  },
  {
    id              : 'a0882ff9-0d95-4d60-835d-85624f7a3411',
    nombre          : 'Finanzas',
    ruta            : 'finanzas',
    icono           : 'finance',
    orden           : 7,
    id_menu_permiso : null,
    estado          : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('sys_menu_permiso', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },

  down (queryInterface, Sequelize) {}
};
