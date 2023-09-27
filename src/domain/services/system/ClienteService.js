'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function clienteService (repositories, helpers, res) {
  const { ClienteRepository, UsuarioRepository } = repositories;

  async function listar (params) {
    try {
      const comentarios = await ClienteRepository.findAll(params);
      return comentarios;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const cliente = await ClienteRepository.findOne(params);
      if (!cliente) {
        throw new Error('La cliente no existe');
      }
      return cliente;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar cliente');
    let cliente;
    try {
      cliente = await ClienteRepository.createOrUpdate(data);
      return cliente;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    debug('Eliminando cliente', id);
    try {
      const resultado = await ClienteRepository.deleteItem(id);
      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findAllTipoDocumentoIdentidad (id) {
    try {
      const objTipodiNombreau = {
        regTipodi   : await ClienteRepository.findAllTipoDocumentoIdentidad(),
        regNombreau : await UsuarioRepository.findAllNombreApellidoUsuario(id)
      };
      return objTipodiNombreau;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    listar,
    findOne,
    createOrUpdate,
    deleteItem,
    findAllTipoDocumentoIdentidad
  };
};
