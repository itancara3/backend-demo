'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id        : util.pk,
    idCliente : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idCliente'),
      field     : 'id_cliente'
    },
    nombre: {
      type      : DataTypes.STRING(150),
      allowNull : false,
      field     : 'nombre'
    },
    cargo: {
      type      : DataTypes.STRING(50),
      allowNull : false,
      field     : 'cargo'
    },
    telefono: {
      type      : DataTypes.STRING(80),
      allowNull : true,
      field     : 'telefono'
    },
    interno: {
      type      : DataTypes.STRING(10),
      allowNull : true,
      field     : 'interno'
    },
    celular: {
      type      : DataTypes.STRING(80),
      allowNull : true,
      field     : 'celular'
    },
    email: {
      type      : DataTypes.STRING(80),
      allowNull : false,
      field     : 'email'
    },
    estado: {
      type         : DataTypes.ENUM,
      allowNull    : false,
      values       : ['ACTIVO', 'INACTIVO'],
      defaultValue : 'ACTIVO',
      xlabel       : lang.t('fields.estado'),
      field        : 'estado'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const ClientePersonaContacto = sequelize.define('cliente_persona_contacto', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'cliente_persona_contacto'
  });

  return ClientePersonaContacto;
};
