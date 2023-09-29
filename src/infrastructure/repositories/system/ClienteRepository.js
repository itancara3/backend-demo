'use strict';

const Repository = require('../Repository');
const { getQuery, toJSON } = require('../../lib/util');

module.exports = function clienteRepository (models, Sequelize) {
  const { cliente, parametro, usuario } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.attributes = [
      'id',
      'idEmpresa',
      'idTipoDocumento',
      'idClienteActividad',
      'codigo',
      'nroDocumento',
      'complemento',
      'nombreFiscal',
      'nombreComercial',
      'direccion',
      'zona',
      'ciudad',
      'departamento',
      'pais',
      'telefono',
      'interno',
      'fax',
      'celular',
      'email',
      'sitioWeb',
      'formaPago',
      'dias',
      'precioVenta',
      'lineaCreditoMonto',
      'estadoCreditoMonto',
      'lineaCreditoNroVentas',
      'estadoCreditoNroVentas',
      'lineaCreditoDias',
      'estadoCreditoDias',
      'cuentaContable',
      'estadoCuentaContable',
      'asesorVentas',
      'bloquear',
      'estado'
    ];
    query.where = {};

    if (params.search) {
      query.where = {
        ...query.where,
        ...{
          [Op.or]: [
            {
              nombre: {
                [Op.iLike]: `%${params.search}%`
              }
            },
            {
              sigla: {
                [Op.iLike]: `%${params.search}%`
              }
            }
          ]
        }
      };
    }

    if (params.nivel) {
      query.where.nivel = params.nivel;
    }

    if (params.id) {
      query.where.id = params.id;
    }

    query.include = [];

    return cliente.findAndCountAll(query);
  }

  async function findAllByIdEmpresa (params = {}) {
    const query = {};
    query.attributes = [
      'id',
      'idEmpresa',
      'idTipoDocumento',
      'idClienteActividad',
      'codigo',
      'nroDocumento',
      'complemento',
      'nombreFiscal',
      'nombreComercial',
      'direccion',
      'zona',
      'ciudad',
      'departamento',
      'pais',
      'telefono',
      'interno',
      'fax',
      'celular',
      'email',
      'sitioWeb',
      'formaPago',
      'dias',
      'precioVenta',
      'lineaCreditoMonto',
      'estadoCreditoMonto',
      'lineaCreditoNroVentas',
      'estadoCreditoNroVentas',
      'lineaCreditoDias',
      'estadoCreditoDias',
      'cuentaContable',
      'estadoCuentaContable',
      'asesorVentas',
      'bloquear',
      'estado'
    ];
    query.where = {};
    query.where = {
      idEmpresa: params
    };
    const result = await cliente.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params = {}) {
    const query = {};
    query.attributes = [
      'id',
      'idEmpresa',
      'idTipoDocumento',
      'idClienteActividad',
      'codigo',
      'nroDocumento',
      'complemento',
      'nombreFiscal',
      'nombreComercial',
      'direccion',
      'zona',
      'ciudad',
      'departamento',
      'pais',
      'telefono',
      'interno',
      'fax',
      'celular',
      'email',
      'sitioWeb',
      'formaPago',
      'dias',
      'precioVenta',
      'lineaCreditoMonto',
      'estadoCreditoMonto',
      'lineaCreditoNroVentas',
      'estadoCreditoNroVentas',
      'lineaCreditoDias',
      'estadoCreditoDias',
      'cuentaContable',
      'estadoCuentaContable',
      'asesorVentas',
      'bloquear',
      'estado'
    ];

    query.include = {
      attributes : ['id', 'codigo', 'grupo', 'nombre', 'descripcion', 'estado'],
      model      : parametro,
      as         : 'parametro'
    };
    query.where = {};
    if (params) {
      query.where = { id: params };
    }
    const result = await cliente.findOne(query);
    if (!result) {
      return null;
    }
    return result.toJSON();
  }

  function findAllTipoDocumentoIdentidad () {
    const query = {};
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'estado'
    ];
    query.where = {};
    query.where = {
      [Op.and]: [
        { estado: 'ACTIVO' },
        { grupo: 'TIPO_DOCUMENTO_IDENTIDAD' }
      ]
    };
    return parametro.findAndCountAll(query);
  }

  async function verifyExistDataClient (params) {
    const query = {};
    query.where = {};

    if (params.codigo) {
      query.where = {
        [Op.and]: [
          { estado: 'ACTIVO' },
          { codigo: params.codigo }
        ]
      };
    }
    if (params.nroDocumento) {
      query.where = {
        [Op.and]: [
          { estado: 'ACTIVO' },
          { nroDocumento: params.nroDocumento }
        ]
      };
    }
    const result = await cliente.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  /*
  function findAllNombreApellidoUsuario (id = {}) {
    const query = {};
    query.where = {};
    query.where = {
      [Op.and]: [
        { estado: 'ACTIVO' },
        { idEmpresa: id }
      ]
    };
    query.include = [
      {
        attributes: [
          'id',
          'idEmpresa',
          'nombres',
          'apellidos',
          'estado'
        ],
        model : usuario,
        as    : 'usuarios'
      }
    ];
    return usuario.findAndCountAll(query);
  }
  */

  return {
    findAll,
    findAllByIdEmpresa,
    findOne,
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, cliente, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, cliente, t),
    findAllTipoDocumentoIdentidad,
    verifyExistDataClient
  };
};
