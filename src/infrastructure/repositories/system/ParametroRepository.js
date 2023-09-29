'use strict';

const { getQuery } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function ParametroRepository (models, Sequelize) {
  const { parametro } = models;
  const Op = Sequelize.Op;
  const attributes = [
    'id',
    'codigo',
    'grupo',
    'nombre',
    'descripcion',
    'tipo',
    'ruta',
    'otros',
    'idPadre',
    'estado'
  ];

  function findAll (params = {}) {
    const query = getQuery(params);
    query.attributes = attributes;
    query.where = {};

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.grupo) {
      query.where.grupo = {
        [Op.iLike]: `%${params.grupo}%`
      };
    }

    if (params.nombre) {
      query.where.nombre = {
        [Op.iLike]: `%${params.nombre}%`
      };
    }

    if (params.descripcion) {
      query.where.descripcion = {
        [Op.iLike]: `%${params.descripcion}%`
      };
    }
    // query.attributes = attributes;
    return parametro.findAndCountAll(query);
  }

  async function findOneToken (params = {}) {
    const query = {};
    query.attributes = ['id', 'codigo', 'grupo', 'nombre', 'descripcion'];
    query.where = {};
    query.where = {
      grupo  : params.grupo,
      codigo : params.codigo
    };

    const result = await parametro.findOne(query);
    if (!result) {
      return null;
    }
    return result.toJSON();
  }
  async function findOne (params = {}) {
    const query = {};
    query.attributes = attributes;
    query.where = {};
    query.where = {
      id: params
    };

    const result = await parametro.findOne(query);
    if (!result) {
      return null;
    }
    return result.toJSON();
  }

  async function findOneByNombre (params = {}) {
    const query = {};
    query.attributes = attributes;
    query.where = {};
    query.where = {
      nombre: params
    };
    const result = await parametro.findOne(query);
    if (!result) {
      return null;
    }
    return result.toJSON();
  }

  return {
    findAll,
    findOneToken,
    findOne,
    findOneByNombre,
    findById       : (id) => Repository.findById(id, parametro, attributes),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, parametro, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, parametro, t)
  };
};
