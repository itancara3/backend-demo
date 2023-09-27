'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id        : util.pk,
    idEmpresa : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idEmpresa'),
      field     : 'id_empresa'
    },
    nombre: {
      type      : DataTypes.STRING(150),
      allowNull : false,
      field     : 'nombre'
    },
    descripcion: {
      type      : DataTypes.TEXT,
      allowNull : false,
      field     : 'descripcion'
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

  const ClienteActividad = sequelize.define('cliente_actividad', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'cliente_actividad'
  });

  return ClienteActividad;
};
