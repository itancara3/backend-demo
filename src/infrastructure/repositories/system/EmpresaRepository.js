'use strict';

const Repository = require('../Repository');
const { getQuery } = require('../../lib/util');

module.exports = function empresaRepository (models, Sequelize) {
  const { empresa, parametro } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.attributes = [
      '‌id',
      'idParametro',
      'numeroDocumento',
      'nombreEmpresa',
      'nombreComercial',
      'personaNatural',
      'empresaUnipersonal',
      'direccionCentral',
      'imagenUrl',
      'inicioOperaciones',
      'correoElectronico',
      'contrasena',
      'estado'
    ];
    query.where = {};

    if (params.search) {
      query.where = {
        ...query.where,
        ...{
          [Op.or]: [
            {
              numeroDocumento: {
                [Op.iLike]: `%${params.search}%`
              }
            },
            {
              nombreEmpresa: {
                [Op.iLike]: `%${params.search}%`
              }
            }
          ]
        }
      };
    }

    if (params.id) {
      query.where.id = params.id;
    }

    query.include = [];

    return empresa.findAndCountAll(query);
  }

  async function findOne (params = {}) {
    const query = {};
    query.attributes = [
      '‌id',
      'idParametro',
      'numeroDocumento',
      'nombreEmpresa',
      'nombreComercial',
      'personaNatural',
      'empresaUnipersonal',
      'direccionCentral',
      'imagenUrl',
      'inicioOperaciones',
      'correoElectronico',
      'contrasena',
      'estado'
    ];
    query.where = {};
    if (params.id) {
      query.where.id = params.id;
    }
    const result = await empresa.findByPk(query.where.id);
    if (!result) {
      return null;
    }
    return result.toJSON();
  }

  async function existsNumNIT (params = {}) {
    const query = {};
    query.attributes = ['nombreEmpresa', 'numeroDocumento', 'estado'];
    query.where = {
      [Op.and]: [
        {
          estado: 'ACTIVO'
        },
        {
          numeroDocumento: params.numeroDocumento
        }
      ]
    };
    const result = await empresa.findOne(query);
    if (!result) {
      return null;
    }
    return result.toJSON();
  }

  function idParametroTipoDocNIT () {
    const query = {};
    query.attributes = ['id'];
    query.where = {
      estado : 'ACTIVO',
      grupo  : 'TIPO_DOCUMENTO_IDENTIDAD',
      nombre : 'NIT'
    };
    return parametro.findOne(query);
  }

  return {
    findAll,
    findOne,
    existsNumNIT,
    idParametroTipoDocNIT,
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, empresa, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, empresa, t)
  };
};
