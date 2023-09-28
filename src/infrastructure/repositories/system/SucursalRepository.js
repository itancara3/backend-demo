'use strict';

const sequelize = require('sequelize');
const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function sucursalRepository (models, Sequelize) {
  const { sucursal, empresa } = models;
  const Op = sequelize.Op;
  const attributes = [
    'id',
    'idEmpresa',
    'nroSucursal',
    'nombre',
    'descripcion',
    'direccion',
    'zona',
    'ciudad',
    'ciudadAbreviatura',
    'pais',
    'email',
    'sitioWeb',
    'telefono',
    'fax',
    'celular',
    'esFiscal',
    'precioVenta',
    'estado',
    'createdAt'
  ];

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.attributes = attributes;
    query.where = {};

    query.include = [
      {
        attributes : ['id', 'nombreEmpresa', 'empresaUnipersonal'],
        model      : empresa,
        as         : 'empresa'
      }
    ];

    if (params.idEmpresa) {
      query.where.idEmpresa = params.idEmpresa;
    }

    if (params.empresa && !params.idEmpresa) {
      query.where.idEmpresa = {
        [Op.in]: params.empresa
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.nombre) {
      query.where.nombre = {
        [Op.iLike]: `%${params.nombre}%`
      };
    }

    if (params.descripcion) {
      query.where.nombre = {
        [Op.iLike]: `%${params.descripcion}%`
      };
    }
    const result = await sucursal.findAndCountAll(query);
    return toJSON(result);
  }

  async function findAllByIdEmpresa (params = {}) {
    const query = {};
    query.attributes = attributes;
    query.where = {};
    query.where = {
      idEmpresa: params
    };
    query.include = [
      {
        attributes : ['id', 'nombreEmpresa', 'empresaUnipersonal'],
        model      : empresa,
        as         : 'empresa'
      }
    ];

    if (params.idEmpresa) {
      query.where.idEmpresa = params.idEmpresa;
    }

    if (params.empresa && !params.idEmpresas) {
      query.where.idEmpresa = {
        [Op.in]: params.empresa
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.nombre) {
      query.where.nombre = {
        [Op.iLike]: `%${params.nombre}%`
      };
    }

    if (params.descripcion) {
      query.where.nombre = {
        [Op.iLike]: `%${params.descripcion}%`
      };
    }

    const result = await sucursal.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params = {}) {
    const query = {
      attributes : attributes,
      where      : params
    };

    query.include = [
      {
        attributes : ['id', 'nombreEmpresa'],
        model      : empresa,
        as         : 'empresa'
      }
    ];

    const result = await sucursal.findOne(query);
    if (!result) {
      return null;
    }
    return result.toJSON();
  }

  async function verificarNroSucursal (params) {
    const query = {};
    query.where = {};

    // if (params.nroSucursal) {
    //   query.where = {
    //     nroSucursal: params.nroSucursal
    //   };
    // }

    // if (params.id) {
    //   query.where.id = params.id;
    // }
    if (params.nroSucursal) {
      query.where = {
        nroSucursal: params.nroSucursal
      };
    }
    console.log('----------------');
    console.log(query);
    const result = await sucursal.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  return {
    findAll,
    findAllByIdEmpresa,
    findOne,
    verificarNroSucursal,
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, sucursal, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, sucursal, t)
  };
};
