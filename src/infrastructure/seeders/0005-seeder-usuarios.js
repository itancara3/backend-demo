'use strict';

const { setTimestampsSeeder } = require('../lib/util');
const { saltRounds } = require('../../common/config/auth');
const bcrypt = require('bcrypt');

// Datos de producción
let items = [
  {
    id                : '7171272e-b31b-4c34-9220-9f535c958c5c',
    id_empresa        : '745034da-06cb-4d98-8fee-4c982adfbb22',
    id_rol            : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    id_tipo_documento : '8f766f5a-53e2-11ee-8c99-0242ac120002',
    nro_documento     : '9248643',
    nombres           : 'Admin',
    apellidos         : 'Admin',
    fecha_nacimiento  : '1993-08-15',
    contrasena        : bcrypt.hashSync('Developer', saltRounds),
    telefono          : '74085280',
    email             : 'admin@yopmail.com',
    ciudad            : 'La Paz',
    provincia_estado  : 'murillo',
    pais              : 'Bolivia',
    codigo_postal     : '0000',
    cargo             : 'CARGO',
    tipo              : 'GERENTE',
    numero_fiscal     : 'admin',
    nombre_fiscal     : 'admin',
    imagen_url        : '',
    color_fondo       : 'verde',
    color_texto       : 'amarillo'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('user_usuario', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
