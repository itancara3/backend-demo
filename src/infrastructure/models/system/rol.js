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
      type      : DataTypes.STRING(50),
      allowNull : false,
      xlabel    : lang.t('fields.nombre')
    },
    descripcion: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.descripcion')
    },
    estado: {
      type         : DataTypes.INTEGER,
      defaultValue : 1,
      allowNull    : false,
      xlabel       : lang.t('fields.estado'),
      field        : '_estado'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Rol = sequelize.define('rol', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'user_rol'
  });

  return Rol;
};
