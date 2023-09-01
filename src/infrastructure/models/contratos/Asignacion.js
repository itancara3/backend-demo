'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id          : util.pk,
    idSolicitud : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idSolicitud'),
      field     : 'id_solicitud'
    },
    idUsuario: {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idUsuario'),
      field     : 'id_usuario'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Asignacion = sequelize.define('asignacion', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'contratos_asignacion'
  });

  return Asignacion;
};
