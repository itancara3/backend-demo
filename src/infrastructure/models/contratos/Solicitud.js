'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id          : util.pk,
    tipoPersona : {
      type   : DataTypes.ENUM,
      values : ['NATURAL', 'JURIDICA'],
      xlabel : lang.t('fields.tipoPersona'),
      field  : 'tipo_persona'
    },
    hojaRuta: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.hojaRuta'),
      field  : 'hoja_ruta'
    },
    latitud: {
      type   : DataTypes.DOUBLE,
      xlabel : lang.t('fields.latitud'),
      field  : 'latitud'
    },
    longitud: {
      type   : DataTypes.DOUBLE,
      xlabel : lang.t('fields.longitud'),
      field  : 'longitud'
    },
    direccion: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.direccion'),
      field  : 'direccion'
    },
    departamento: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.departamento'),
      field  : 'departamento'
    },
    provincia: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.provincia'),
      field  : 'provincia'
    },
    municipio: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.municipio'),
      field  : 'municipio'
    },
    tipoVenta: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.tipoVenta'),
      field  : 'tipoVenta'
    }

  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Solicitud = sequelize.define('solicitud', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'contratos_solicitud'
  });

  return Solicitud;
};
