'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id    : util.pk,
    codigo: {
      type      : DataTypes.STRING(50),
      allowNull : false,
      xlabel    : lang.t('fields.codigo')
    },
    grupo : {
      type      : DataTypes.STRING(250),
      allowNull : false,
      xlabel    : lang.t('fields.grupo')
    },
    nombre: {
      type      : DataTypes.STRING(1000),
      allowNull : true,
      xlabel    : lang.t('fields.nombre')
    },
    descripcion: {
      type      : DataTypes.STRING(1000),
      allowNull : true,
      xlabel    : lang.t('fields.descripcion')
    },
    tipo: {
      type      : DataTypes.STRING(10),
      allowNull : true,
      xlabel    : lang.t('fields.tipo')
    },
    ruta: {
      type      : DataTypes.STRING(250),
      allowNull : true,
      xlabel    : lang.t('fields.ruta')
    },
    otros: {
      type      : DataTypes.STRING(250),
      allowNull : true,
      xlabel    : lang.t('fields.otros')
    },
    idPadre : {
      type      : DataTypes.UUID,
      allowNull : true,
      xlabel    : lang.t('fields.idPadre'),
      field     : 'id_padre'
    },
    estado: {
      type         : DataTypes.ENUM,
      values       : ['ACTIVO', 'INACTIVO'],
      defaultValue : 'ACTIVO',
      allowNull    : false,
      xlabel       : lang.t('fields.estado'),
      field        : 'estado'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Parametro = sequelize.define('parametro', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'sys_parametro'
  });

  return Parametro;
};
