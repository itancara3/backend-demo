'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id    : util.pk,
    idRol : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idRol'),
      field  : 'id_rol'
    },
    idMenuPermiso: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idMenu'),
      field  : 'id_menu_permiso'
    },
    acceso: {
      type         : DataTypes.BOOLEAN,
      defaultValue : true,
      xlabel       : lang.t('fields.acceso'),
      field        : 'acceso'
    },
    estado: {
      type         : DataTypes.ENUM,
      values       : ['ACTIVO', 'INACTIVO'],
      defaultValue : 'ACTIVO',
      xlabel       : lang.t('fields.estado'),
      field        : 'estado'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Permiso = sequelize.define('permiso', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'user_permiso'
  });

  return Permiso;
};
