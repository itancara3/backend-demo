'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function menusRepository (models, Sequelize) {
  const { menu, permiso } = models;
  const Op = Sequelize.Op;

  function findAll (params = {}) {
    const query = getQuery(params);
    query.attributes = [
      'id',
      'nombre',
      'ruta',
      'icono',
      'idMenuPermiso',
      'orden',
      'tipo',
      'estado'
    ];

    query.where = {};
    // query.include = [
    //   {
    //     model : menu,
    //     as    : 'menu'
    //   }
    // ];

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.nombre) {
      query.where.nombre = {
        [Op.iLike]: `%${params.nombre}%`
      };
    }

    return menu.findAndCountAll(query);
  }

  function findOne (params = {}) {
    const query = {};
    query.where = params;
    query.include = [];
    return menu.findOne(query);
  }

  async function findByRoles (rol) {
    const query = {};
    query.where = {
      estado: 'ACTIVO'
    };

    query.attributes = [
      'id',
      'nombre',
      'ruta',
      'icono',
      'idMenuPermiso',
      'orden',
      'tipo',
      'estado'
    ];

    query.order = [['orden', 'ASC']];

    query.include = [
      {
        required   : true,
        attributes : [],
        model      : permiso,
        as         : 'permisos',
        where      : {
          idRol: {
            [Op.eq]: rol
          }
        }
      }
    ];

    const result = await menu.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findByRoles,
    findOne,
    findById       : (id) => Repository.findById(id, menu),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, menu, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, menu, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, menu, t)
  };
};
