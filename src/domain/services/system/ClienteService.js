'use strict';

const debug = require('debug')('app:service:auth');
const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function clienteService (repositories, helpers, res) {
  const { ClienteRepository, UsuarioRepository, ParametroRepository } = repositories;

  async function listar (params) {
    try {
      const comentarios = await ClienteRepository.findAll(params);
      return comentarios;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function listarPorEmpresa (id) {
    try {
      const cliente = await ClienteRepository.findAllByIdEmpresa(id);
      return cliente;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function mostrar (params) {
    try {
      const cliente = await ClienteRepository.findOne(params);
      if (!cliente) {
        throw new Error('El o la cliente no existe');
      }
      return cliente;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar cliente');
    const { tipoDocumento } = data;
    let cliente;
    let msgtexto = '| ';
    console.log(data);
    try {
      if (tipoDocumento) {
        const result = await ParametroRepository.findOneByNombre(tipoDocumento);
        if (result.id !== data.idTipoDocumento) {
          data.idTipoDocumento = result.id;
        }
      }
      cliente = await ClienteRepository.createOrUpdate(data);
      const msg = await this.verifyClienteRegistrationExists(data);
      if (!Array.isArray(msg) || msg.length === 0) {
        cliente = await ClienteRepository.createOrUpdate(data);
        return cliente;
      } else {
        msg.forEach(function (v) { msgtexto += v; msgtexto += ' | '; });
        throw new Error(
          'Ya se encuentra registrado el cliente: ' + msgtexto
        );
      }
      // cliente.idTipoDocumento = tipoDocumento.idTipoDocumento;
      // return cliente;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  const verifyClienteRegistrationExists = async (data) => {
    const msg = [];
    const existeCodigo = await ClienteRepository.verifyExistDataClient({
      codigo: data.codigo
    });
    const existeNroDocumento = await ClienteRepository.verifyExistDataClient({
      nroDocumento: data.nroDocumento
    });
    if (existeCodigo) {
      if (existeCodigo.codigo === data.codigo) {
        if (!data.id || data.id !== existeCodigo.id) {
          msg.push(`con el código: "${data.codigo}"`);
        }
      }
    }
    if (existeNroDocumento) {
      if (existeNroDocumento.nroDocumento === data.nroDocumento) {
        if (!data.id || data.id !== existeNroDocumento.id) {
          msg.push(`con el número de documento: "${data.nroDocumento}"`);
        }
      }
    }
    return msg;
  };

  // const verifyClienteRegistrationExists = async (data) => {
  //   const msg = [];
  //   const existeCodigo = await ClienteRepository.verifyExistDataClient({
  //     codigo: data.codigo,
  //   });
  //   const existeNroDocumento = await ClienteRepository.verifyExistDataClient({
  //     nroDocumento: data.nroDocumento,
  //   });
  //   if (existeCodigo) {
  //     if (existeCodigo.codigo === data.codigo) {
  //       if (!data.id || data.id !== existeCodigo.id) {
  //         msg.push(`con el código: "${data.codigo}"`);
  //       }
  //     }
  //   }
  //   if (existeNroDocumento) {
  //     if (existeNroDocumento.nroDocumento === data.nroDocumento) {
  //       if (!data.id || data.id !== existeNroDocumento.id) {
  //         msg.push(`con el número de documento: "${data.nroDocumento}"`);
  //       }
  //     }
  //   }
  //   return msg;
  // };

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

  // async function mostrar (id) {
  //   try {
  //     return ParametroRepository.findOne({ id });
  //   } catch (error) {
  //     throw new ErrorApp(error.message, 400);
  //   }
  // }

  return {
    listar,
    listarPorEmpresa,
    // findOne,
    mostrar,
    createOrUpdate,
    deleteItem,
    findAllTipoDocumentoIdentidad,
    verifyClienteRegistrationExists
  };
};
