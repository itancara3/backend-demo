'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function rolesRepository (models, Sequelize) {
  const { rol, ruta, menu, empresa, permiso } = models;
  const Op = Sequelize.Op;

  const attributes = ['id', 'idEmpresa', 'nombre', 'descripcion', 'estado', 'createdAt'];

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.attributes = attributes;
    query.where = {};

    query.include = [
      {
        attributes: [
          'id',
          'nombreEmpresa',
          'nombreComercial',
          'personaNatural',
          'empresaUnipersonal',
          'direccionCentral',
          'estado'
        ],
        model : empresa,
        as    : 'empresa'
      }
      // {
      //   through : { attributes: [] },
      //   model   : menu,
      //   as      : 'menus'
      // }
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

    const result = await rol.findAndCountAll(query);
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
        attributes: [
          'id',
          'nombreEmpresa',
          'nombreComercial',
          'personaNatural',
          'empresaUnipersonal',
          'direccionCentral',
          'estado'
        ],
        model : empresa,
        as    : 'empresa'
      }
      // {
      //   through : { attributes: [] },
      //   model   : menu,
      //   as      : 'menus'
      // }
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

    const result = await rol.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params = {}) {
    const query = {
      attributes : ['id', 'idEmpresa', 'nombre', 'descripcion', 'estado'],
      where      : params
    };

    query.include = [
      {
        attributes: [
          'id',
          'nombreEmpresa'
        ],
        model : empresa,
        as    : 'empresa'
      }
      // {
      //   attributes : [],
      //   model      : permiso,
      //   as         : 'permisos',
      //   where      : { idRol: params.id }
      // include    : {
      //   model : menu,
      //   as    : 'menu'
      // where : { id: permiso.idMenuPermiso }
      // }
      // }
    ];
    const result = await rol.findOne(query);
    if (!result) {
      return null;
    }
    return result.toJSON();
  }

  return {
    findAll,
    findAllByIdEmpresa,
    findOne,
    findById       : id => Repository.findById(id, rol, attributes),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, rol, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, rol, t)
  };
};
