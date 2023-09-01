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
    nombre: {
      type      : DataTypes.STRING(150),
      allowNull : false,
      xlabel    : lang.t('fields.nombre'),
      field     : 'nombre'

    },
    rutaContrato: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.rutaContrato'),
      field  : 'ruta_contrato'
    },
    hashContrato: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.hashContrato'),
      field  : 'hash_contrato'
    },
    ruta: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.ruta'),
      field  : 'ruta'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Certificacion = sequelize.define('certificacion', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'contratos_certificacion'
  });

  return Certificacion;
};
