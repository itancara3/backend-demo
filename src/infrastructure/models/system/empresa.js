'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id          : util.pk,
    idParametro : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idParametro'),
      field     : 'id_parametro'
    },
    numeroDocumento: {
      type      : DataTypes.STRING(20),
      allowNull : false,
      xlabel    : lang.t('fields.numeroDocumento'),
      field     : 'numero_documento'
    },
    nombreEmpresa: {
      type      : DataTypes.STRING(250),
      allowNull : false,
      xlabel    : lang.t('fields.nombreEmpresa'),
      field     : 'nombre_empresa'
    },
    nombreComercial: {
      type      : DataTypes.STRING(250),
      allowNull : true,
      xlabel    : lang.t('fields.nombreComercial'),
      field     : 'nombre_comercial'
    },
    personaNatural: {
      type      : DataTypes.STRING(150),
      allowNull : true,
      xlabel    : lang.t('fields.personaNatural'),
      field     : 'persona_natural'
    },
    empresaUnipersonal: {
      type      : DataTypes.BOOLEAN,
      allowNull : false,
      xlabel    : lang.t('fields.empresaUnipersonal'),
      field     : 'empresa_unipersonal'
    },
    direccionCentral: {
      type      : DataTypes.TEXT,
      allowNull : true,
      xlabel    : lang.t('fields.direccionCentral'),
      field     : 'direccion_central'
    },
    imagenUrl: {
      type      : DataTypes.STRING(200),
      allowNull : true,
      xlabel    : lang.t('fields.imagenUrl'),
      field     : 'imagen_url'
    },
    inicioOperaciones: {
      type         : DataTypes.BOOLEAN,
      allowNull    : false,
      defaultValue : false,
      xlabel       : lang.t('fields.inicioOperaciones'),
      field        : 'inicio_operaciones'
    },
    correoElectronico: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.correoElectronico'),
      field     : 'correo_electronico'
    },
    contrasena: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.contrasena')
    },
    estado: {
      type         : DataTypes.ENUM,
      allowNull    : false,
      values       : ['1', '0'],
      defaultValue : '1',
      xlabel       : lang.t('fields.estado'),
      field        : '_estado'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Empresa = sequelize.define('empresa', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'sys_empresa'
  });

  return Empresa;
};
