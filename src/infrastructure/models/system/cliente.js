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
    idTipoDocumento: {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idTipoDocumento'),
      field     : 'id_tipo_documento'
    },
    idClienteActividad: {
      type         : DataTypes.UUID,
      allowNull    : true,
      defaultValue : null,
      xlabel       : lang.t('fields.idClienteActividad'),
      field        : 'id_cliente_actividad'
    },
    codigo: {
      type      : DataTypes.STRING(15),
      allowNull : false,
      xlabel    : lang.t('fields.codigo')
    },
    nroDocumento: {
      type      : DataTypes.STRING(30),
      allowNull : false,
      xlabel    : lang.t('fields.nroDocumento'),
      field     : 'nro_documento'
    },
    complemento: {
      type      : DataTypes.STRING(4),
      allowNull : false,
      field     : 'complemento'
    },
    nombreFiscal: {
      type      : DataTypes.STRING(150),
      allowNull : false,
      xlabel    : lang.t('fields.nombreFiscal'),
      field     : 'nombre_fiscal'
    },
    nombreComercial: {
      type      : DataTypes.STRING(150),
      allowNull : false,
      xlabel    : lang.t('fields.nombreComercial'),
      field     : 'nombre_comercial'
    },
    direccion: {
      type         : DataTypes.STRING(150),
      allowNull    : true,
      defaultValue : false,
      field        : 'direccion'
    },
    zona: {
      type         : DataTypes.STRING(50),
      allowNull    : true,
      defaultValue : false,
      field        : 'zona'
    },
    ciudad: {
      type         : DataTypes.STRING(50),
      allowNull    : true,
      defaultValue : false,
      field        : 'ciudad'
    },
    departamento: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      xlabel    : lang.t('fields.departamento'),
      field     : 'departamento'
    },
    pais: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      field     : 'pais'
    },
    telefono: {
      type      : DataTypes.STRING(80),
      allowNull : true,
      field     : 'telefono'
    },
    interno: {
      type      : DataTypes.STRING(10),
      allowNull : true,
      field     : 'interno'
    },
    fax: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      field     : 'fax'
    },
    celular: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      field     : 'celular'
    },
    email: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      field     : 'email'
    },
    sitioWeb: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.sitioWeb'),
      field     : 'sitio_web'
    },
    formaPago: {
      type      : DataTypes.STRING(50),
      allowNull : true,
      xlabel    : lang.t('fields.formaPago'),
      field     : 'forma_pago'
    },
    dias: {
      type         : DataTypes.INTEGER,
      allowNull    : true,
      defaultValue : 0,
      field        : 'dias'
    },
    precioVenta: {
      type         : DataTypes.INTEGER,
      allowNull    : true,
      defaultValue : 0,
      xlabel       : lang.t('fields.precioVenta'),
      field        : 'precio_venta'
    },
    lineaCreditoMonto: {
      type         : DataTypes.FLOAT,
      defaultValue : 0.00,
      xlabel       : lang.t('fields.lineaCreditoMonto'),
      field        : 'linea_credito_monto'
    },
    estadoCreditoMonto: {
      type         : DataTypes.BOOLEAN,
      allowNull    : true,
      defaultValue : false,
      xlabel       : lang.t('fields.estadoCreditoMonto'),
      field        : 'estado_credito_monto'
    },
    lineaCreditoNroVentas: {
      type         : DataTypes.INTEGER,
      defaultValue : 0,
      xlabel       : lang.t('fields.lineaCreditoNroVentas'),
      field        : 'linea_credito_nro_ventas'
    },
    estadoCreditoNroVentas: {
      type         : DataTypes.BOOLEAN,
      allowNull    : true,
      defaultValue : false,
      xlabel       : lang.t('fields.estadoCreditoNroVentas'),
      field        : 'estado_credito_nro_ventas'
    },
    lineaCreditoDias: {
      type         : DataTypes.INTEGER,
      defaultValue : 0,
      xlabel       : lang.t('fields.lineaCreditoDias'),
      field        : 'linea_credito_dias'
    },
    estadoCreditoDias: {
      type         : DataTypes.BOOLEAN,
      allowNull    : true,
      defaultValue : false,
      xlabel       : lang.t('fields.estadoCreditoDias'),
      field        : 'estado_credito_dias'
    },
    cuentaContable: {
      type      : DataTypes.STRING(15),
      allowNull : true,
      xlabel    : lang.t('fields.cuentaContable'),
      field     : 'cuenta_contable'
    },
    estadoCuentaContable: {
      type         : DataTypes.BOOLEAN,
      allowNull    : false,
      defaultValue : true,
      xlabel       : lang.t('fields.estadoCuentaContable'),
      field        : 'estado_cuenta_contable'
    },
    asesorVentas: {
      type      : DataTypes.STRING(36),
      allowNull : true,
      xlabel    : lang.t('fields.asesorVentas'),
      field     : 'asesor_ventas'
    },
    bloquear: {
      type         : DataTypes.BOOLEAN,
      allowNull    : true,
      defaultValue : false,
      field        : 'bloquear'
    },
    estado: {
      type         : DataTypes.ENUM,
      allowNull    : false,
      values       : ['ACTIVO', 'INACTIVO'],
      defaultValue : 'ACTIVO',
      xlabel       : lang.t('fields.estado'),
      field        : 'estado'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Cliente = sequelize.define('cliente', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'cliente'
  });

  return Cliente;
};
