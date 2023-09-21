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
    idRol: {
      type   : DataTypes.UUID,
      // allowNull : false,
      xlabel : lang.t('fields.idRol'),
      field  : 'id_rol'
    },
    idTipoDocumento: {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idTipoDocumento'),
      field     : 'id_tipo_documento'
    },
    nroDocumento: {
      type      : DataTypes.STRING(20),
      allowNull : true,
      xlabel    : lang.t('fields.nroDocumento'),
      field     : 'nro_documento'
    },
    nombres: {
      type      : DataTypes.STRING(80),
      allowNull : true,
      xlabel    : lang.t('fields.nombres'),
      field     : 'nombres'
    },
    apellidos: {
      type      : DataTypes.STRING(150),
      allowNull : true,
      xlabel    : lang.t('fields.apellidos'),
      field     : 'apellidos'
    },
    fechaNacimiento: {
      type      : DataTypes.DATEONLY,
      allowNull : true,
      xlabel    : lang.t('fields.fechaNacimiento'),
      field     : 'fecha_nacimiento'
    },
    contrasena: {
      type      : DataTypes.STRING(150),
      allowNull : false,
      xlabel    : lang.t('fields.contrasena')
    },
    telefono: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      xlabel    : lang.t('fields.telefono'),
      field     : 'telefono'
    },
    email: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.email'),
      field     : 'email'
    },
    direccion: {
      type      : DataTypes.STRING(250),
      allowNull : true,
      xlabel    : lang.t('fields.direccion'),
      field     : 'direccion'
    },
    ciudad: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.ciudad'),
      field     : 'ciudad'
    },
    provinciaEstado: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.provinciaEstado'),
      field     : 'provincia_estado'
    },
    pais: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.pais'),
      field     : 'pais'
    },
    codigoPostal: {
      type      : DataTypes.STRING(10),
      allowNull : true,
      xlabel    : lang.t('fields.codigoPostal'),
      field     : 'codigo_postal'
    },
    cargo: {
      type      : DataTypes.STRING(150),
      allowNull : true,
      xlabel    : lang.t('fields.cargo'),
      field     : 'cargo'
    },
    tipo: {
      type         : DataTypes.INTEGER,
      defaultValue : 0,
      xlabel       : lang.t('fields.tipo'),
      field        : 'tipo'
    },
    numeroFiscal: {
      type      : DataTypes.STRING(30),
      allowNull : true,
      xlabel    : lang.t('fields.numeroFiscal'),
      field     : 'numero_fiscal'
    },
    nombreFiscal: {
      type      : DataTypes.STRING(250),
      allowNull : true,
      xlabel    : lang.t('fields.nombreFiscal'),
      field     : 'nombre_fiscal'
    },
    imagenUrl: {
      type      : DataTypes.STRING(200),
      allowNull : true,
      xlabel    : lang.t('fields.imagenUrl'),
      field     : 'imagen_url'
    },
    colorFondo: {
      type      : DataTypes.STRING(25),
      allowNull : true,
      xlabel    : lang.t('fields.colorFondo'),
      field     : 'color_fondo'
    },
    colorTexto: {
      type      : DataTypes.STRING(25),
      allowNull : true,
      xlabel    : lang.t('fields.colorTexto'),
      field     : 'color_texto'
    },
    token: {
      type      : DataTypes.STRING(150),
      allowNull : true,
      xlabel    : lang.t('fields.token'),
      field     : 'token'
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

  const User = sequelize.define('usuario', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'user_usuario'
  });

  return User;
};
