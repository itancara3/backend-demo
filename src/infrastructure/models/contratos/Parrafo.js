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
    orden: {
      type      : DataTypes.INTEGER,
      allowNull : false,
      default   : 0,
      xlabel    : lang.t('fields.orden'),
      field     : 'id_solicitud'

    },
    titulo: {
      type   : DataTypes.STRING(500),
      xlabel : lang.t('fields.titulo'),
      field  : 'titulo'
    },
    contenido: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.contenido'),
      field  : 'contenido'
    },
    observado: {
      type   : DataTypes.BOOLEAN,
      xlabel : lang.t('fields.observado'),
      field  : 'observado'
    },
    observacion: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.observacion'),
      field  : 'observacion'
    }

  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Parrafo = sequelize.define('parrafo', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'contratos_parrafo'
  });

  return Parrafo;
};
