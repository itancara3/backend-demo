'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function usuariosRepository (models, Sequelize) {
  const Op = Sequelize.Op;
  const { usuario, empresa, rol, entidad } = models;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.attributes = [
      'id',
      'idEmpresa',
      'idRol',
      'idTipoDocumento',
      'nroDocumento',
      'nombres',
      'apellidos',
      'fechaNacimiento',
      'contrasena',
      'telefono',
      'email',
      'direccion',
      'ciudad',
      'provinciaEstado',
      'pais',
      'codigoPostal',
      'cargo',
      'tipo',
      'numeroFiscal',
      'nombreFiscal',
      'imagenUrl',
      'colorFondo',
      'colorTexto',
      'token',
      'estado'
    ];
    query.where = {};

    if (params.exclude) {
      query.where.id = {
        [Op.notIn]: Array.isArray(params.exclude)
          ? params.exclude
          : [params.exclude]
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.search) {
      query.where = {
        ...query.where,
        [Op.or]: [
          {
            nombres: {
              [Op.iLike]: `%${params.search}%`
            }
          },
          {
            apellidos: {
              [Op.iLike]: `%${params.search}%`
            }
          }
        ]
      };
    }

    if (params.nombres) {
      query.where.nombres = {
        [Op.iLike]: `%${params.nombres}%`
      };
    }

    if (params.apellidos) {
      query.where.primerApellido = {
        [Op.iLike]: `%${params.primerApellido}%`
      };
    }

    if (params.nroDocumento) {
      query.where.nroDocumento = {
        [Op.iLike]: `%${params.nroDocumento}%`
      };
    }

    if (params.email) {
      query.where.email = {
        [Op.iLike]: `%${params.email}%`
      };
    }

    if (params.telefono) {
      query.where.telefono = {
        [Op.iLike]: `%${params.telefono}%`
      };
    }

    query.include = [
      {
        attributes : ['id', 'numeroDocumento', 'nombreEmpresa'],
        model      : empresa,
        as         : 'empresa'
      },
      {
        through : { attributes: [] },
        model   : rol,
        as      : 'roles'
      }
    ];

    const result = await usuario.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params = {}) {
    const query = {};
    query.attributes = [
      'id',
      'idEmpresa',
      'idRol',
      'idTipoDocumento',
      'nroDocumento',
      'nombres',
      'apellidos',
      'fechaNacimiento',
      'contrasena',
      'telefono',
      'email',
      'direccion',
      'ciudad',
      'provinciaEstado',
      'pais',
      'codigoPostal',
      'cargo',
      'tipo',
      'numeroFiscal',
      'nombreFiscal',
      'imagenUrl',
      'colorFondo',
      'colorTexto',
      'token',
      'estado'
    ];

    query.where = params;

    query.include = [
      {
        attributes : ['id', 'numeroDocumento', 'nombreEmpresa'],
        model      : empresa,
        as         : 'empresa'
      },
      {
        required   : true,
        through    : { attributes: [] },
        attributes : ['id', 'idEmpresa', 'nombre', 'descripcion', 'estado'],
        model      : rol,
        as         : 'roles'
      }
    ];

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function findByCi (params = {}) {
    const query = {};

    query.where = params;

    query.include = [
      {
        attributes : ['id', 'numeroDocumento', 'nombreEmpresa'],
        model      : empresa,
        as         : 'empresa'
      },
      {
        required   : true,
        through    : { attributes: [] },
        attributes : ['id', 'idEmpresa', 'nombre', 'descripcion', 'estado'],
        model      : rol,
        as         : 'roles'
      }
    ];

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function login (params = {}) {
    const query = {};
    query.attributes = [
      'id',
      'contrasena',
      'usuario',
      'nombres',
      'primerApellido',
      'segundoApellido',
      'nroDocumento',
      'telefono',
      'celular',
      'correoElectronico',
      'foto',
      'estado'
    ];

    query.where = params;

    query.include = [
      {
        attributes : ['id', 'nombre', 'sigla', 'nivel', 'idEntidad'],
        model      : entidad,
        as         : 'entidad'
      },
      {
        required   : true,
        through    : { attributes: [] },
        attributes : ['id', 'idEntidad', 'nombre', 'descripcion', 'estado'],
        model      : rol,
        as         : 'roles'
      }
    ];

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function findById (id) {
    const query = {};

    query.where = {
      id,
      estado: 'ACTIVO'
    };

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function createOrUpdate (usuarioParam, t) {
    const cond = {
      where: {
        id: usuarioParam.id || null
      }
    };

    const item = await usuario.findOne(cond);

    if (item) {
      let updated;
      try {
        if (t) {
          cond.transaction = t;
        }
        updated = await usuario.update(usuarioParam, cond);
      } catch (e) {
        errorHandler(e);
      }
      const result = updated ? await usuario.findOne(cond) : item;

      if (result) {
        return result.toJSON();
      }
      return null;
    }

    let result;
    try {
      result = await usuario.create(usuarioParam, t ? { transaction: t } : {});
    } catch (e) {
      errorHandler(e);
    }
    return result.toJSON();
  }

  async function verificarCorreoElectronico (params) {
    const query = {};
    query.where = {};

    if (params.correoElectronico) {
      Object.assign(query.where, {
        email: params.correoElectronico
      });
    }

    if (params.numeroDocumento && params.correoElectronico) {
      query.include = [
        {
          required   : true,
          attributes : ['id', 'numeroDocumento', 'nombreEmpresa'],
          model      : empresa,
          as         : 'empresa',
          where      : {
            [Op.and]: [
              {
                estado: 'ACTIVO'
              },
              {
                numeroDocumento: params.numeroDocumento
              }
            ]
          }
        }
      ];
    }

    if (params.id) {
      query.where.id = {
        [Op.not]: params.id
      };
    }

    const result = await usuario.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  return {
    findByCi,
    login,
    findById,
    verificarCorreoElectronico,
    findAll,
    findOne,
    createOrUpdate,
    deleteItem: (id, t) => Repository.deleteItem(id, usuario, t)
  };
};
