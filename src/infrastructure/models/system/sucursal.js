'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id        : util.pk,
    idEmpresa : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fiels.idEmpresa'),
      field     : 'id_empresa'
    },
    nroSucursal: {
      type   : DataTypes.INTEGER,
      xlabel : lang.t('fields.nroSucursal'),
      field  : 'nro_sucursal'
    },
    nombre: {
      type      : DataTypes.STRING(20),
      allowNull : true,
      xlabel    : lang.t('fields.nombre')
    },
    descripcion: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      xlabel    : lang.t('fields.descripcion')
    },
    direccion: {
      type   : DataTypes.STRING(350),
      xlabel : lang.t('fields.direccion'),
      field  : 'direccion'
    },
    zona: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.zona'),
      field  : 'zona'
    },
    ciudad: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.ciudad'),
      field  : 'ciudad'
    },
    ciudadAbreviatura: {
      type   : DataTypes.STRING(15),
      xlabel : lang.t('fields.abreviaturaCiudad'),
      field  : 'ciudad_abreviatura'
    },
    pais: {
      type   : DataTypes.STRING(15),
      xlabel : lang.t('fields.pais'),
      field  : 'pais'
    },
    email: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      xlabel    : lang.t('fields.email'),
      field     : 'email'
    },
    sitioWeb: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.sitioWeb'),
      field  : 'sitio_web'
    },
    telefono: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      xlabel    : lang.t('fields.telefono'),
      field     : 'telefono'
    },
    fax: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      xlabel    : lang.t('fields.fax'),
      field     : 'fax'
    },
    celular: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      xlabel    : lang.t('fields.celular'),
      field     : 'celular'
    },
    esFiscal: {
      type         : DataTypes.BOOLEAN,
      defaultValue : true,
      xlabel       : lang.t('fields.esFiscal'),
      field        : 'es_fiscal'
    },
    precioVenta: {
      type         : DataTypes.INTEGER,
      defaultValue : 0,
      xlabel       : lang.t('fields.precioVenta'),
      field        : 'precio_venta'
    },
    linkMap: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.linkMap'),
      field  : 'link_map'
    },
    horario: {
      type   : DataTypes.STRING(150),
      xlabel : lang.t('fields.horario')
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

  //  Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Sucursal = sequelize.define('sucursal', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'sucursal'
  });
  return Sucursal;
};
