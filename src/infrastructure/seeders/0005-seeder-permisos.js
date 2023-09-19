'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    id              : '9d6e3afa-2efe-44fa-b08c-4d45778cecce',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : '6190597f-7fa6-4c39-bcc9-7a1441ba566a',
    acceso          : true,
    _estado         : 1
  },
  {
    id              : 'ead6d883-f0a2-4806-9797-270d8c1bf35f',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : '039a897a-76dd-44c1-b3d7-9682df8f5342',
    acceso          : true,
    _estado         : 1
  },
  {
    id              : '196387cb-ac7a-4aac-89ed-3b75f6efc78b',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : '61d6d53b-ac65-41ac-bc54-3228f548f40a',
    acceso          : true,
    _estado         : 1
  },
  {
    id              : '72a9a41e-998b-4ada-80b3-354dc0dccd0e',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : 'ef6b99d0-0834-4d1e-86b0-207111744f98',
    acceso          : true,
    _estado         : 1
  },
  {
    id              : '67fcd676-938d-4c86-9b7f-e79508243c0c',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : '6dc27435-bb49-48c8-b98d-ed9024d10ec5',
    acceso          : true,
    _estado         : 1
  },
  {
    id              : '49dc495f-8594-4c30-9308-5769f2067b66',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : 'a0882ff9-0d95-4d60-835d-85624f7a3469',
    acceso          : true,
    _estado         : 1
  },
  {
    id              : 'e0fcf530-56fb-11ee-8c99-0242ac120002',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : 'a0882ff9-0d95-4d60-835d-85624f7a3411',
    acceso          : true,
    _estado         : 1
  },
  {
    id              : '31dc26f6-56fc-11ee-8c99-0242ac120002',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : '2a9d51aa-5646-11ee-8c99-0242ac120002',
    acceso          : true,
    _estado         : 1
  },
  {
    id              : '7ed66c1e-56fc-11ee-8c99-0242ac120002',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : '4a247690-5644-11ee-8c99-0242ac120002',
    acceso          : true,
    _estado         : 1
  },
  {
    id              : 'a1a423c6-56fc-11ee-8c99-0242ac120002',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : '3ba38bae-5646-11ee-8c99-0242ac120002',
    acceso          : true,
    _estado         : 1
  },
  {
    id              : 'b1a8f490-56fc-11ee-8c99-0242ac120002',
    id_rol          : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_menu_permiso : '42b35d8e-5646-11ee-8c99-0242ac120002',
    acceso          : true,
    _estado         : 1
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('user_permiso', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },

  down (queryInterface, Sequelize) {}
};
