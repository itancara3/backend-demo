'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  // DATOS MENU PRINCIPAL(NIVEL = 1)
  {
    id              : '6190597f-7fa6-4c39-bcc9-7a1441ba566a',
    nombre          : 'Dashboard',
    ruta            : 'dashboard',
    icono           : 'dashboard',
    id_menu_permiso : null,
    orden           : 1,
    tipo            : 'MENU',
    estado          : 'ACTIVO'
  },
  {
    id              : '039a897a-76dd-44c1-b3d7-9682df8f5342',
    nombre          : 'Administracion',
    ruta            : '',
    icono           : 'folder_open',
    id_menu_permiso : null,
    orden           : 2,
    tipo            : 'MENU',
    estado          : 'ACTIVO'
  },
  {
    id              : '61d6d53b-ac65-41ac-bc54-3228f548f40a',
    nombre          : 'Productos',
    ruta            : 'productos',
    icono           : 'medication',
    id_menu_permiso : null,
    orden           : 3,
    tipo            : 'MENU',
    estado          : 'ACTIVO'
  },
  {
    id              : 'ef6b99d0-0834-4d1e-86b0-207111744f98',
    nombre          : 'Compras',
    ruta            : 'compras',
    icono           : 'shopping_bag',
    id_menu_permiso : null,
    orden           : 4,
    tipo            : 'MENU',
    estado          : 'ACTIVO'
  },
  {
    id              : '6dc27435-bb49-48c8-b98d-ed9024d10ec5',
    nombre          : 'Ventas',
    ruta            : 'ventas',
    icono           : 'shopping_cart',
    id_menu_permiso : null,
    orden           : 5,
    tipo            : 'MENU',
    estado          : 'ACTIVO'
  },
  {
    id              : 'a0882ff9-0d95-4d60-835d-85624f7a3469',
    nombre          : 'Inventarios',
    ruta            : 'inventarios',
    icono           : 'inventory',
    id_menu_permiso : null,
    orden           : 6,
    tipo            : 'MENU',
    estado          : 'ACTIVO'
  },
  {
    id              : 'a0882ff9-0d95-4d60-835d-85624f7a3411',
    nombre          : 'Finanzas',
    ruta            : 'finanzas',
    icono           : 'finance',
    id_menu_permiso : null,
    orden           : 7,
    tipo            : 'MENU',
    estado          : 'ACTIVO'
  },
  // DATOS SUB_MENU(NIVEL = 2)
  {
    id              : '2a9d51aa-5646-11ee-8c99-0242ac120002',
    nombre          : 'Configuracion',
    ruta            : 'configuracion',
    icono           : '',
    id_menu_permiso : '039a897a-76dd-44c1-b3d7-9682df8f5342',
    orden           : 201,
    tipo            : 'MENU',
    estado          : 'ACTIVO'
  },
  {
    id              : '4a247690-5644-11ee-8c99-0242ac120002',
    nombre          : 'Usuarios',
    ruta            : '',
    icono           : '',
    id_menu_permiso : '039a897a-76dd-44c1-b3d7-9682df8f5342',
    orden           : 202,
    tipo            : 'MENU',
    estado          : 'ACTIVO'
  },
  // DATOS SUB_MENU(NIVEL = 3)
  {
    id              : '3ba38bae-5646-11ee-8c99-0242ac120002',
    nombre          : 'Roles',
    ruta            : 'roles',
    icono           : 'roles',
    id_menu_permiso : '4a247690-5644-11ee-8c99-0242ac120002',
    orden           : 20201,
    tipo            : 'MENU',
    estado          : 'ACTIVO'
  },
  {
    id              : '42b35d8e-5646-11ee-8c99-0242ac120002',
    nombre          : 'Usuarios',
    ruta            : 'usuarios',
    icono           : '',
    id_menu_permiso : '4a247690-5644-11ee-8c99-0242ac120002',
    orden           : 20202,
    tipo            : 'MENU',
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
