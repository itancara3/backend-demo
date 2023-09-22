'use strict';

const debug = require('debug')('app:service:auth');
const { ErrorApp } = require('../../lib/error');
const Service = require('../Service');

module.exports = function empresaService (repositories, helpers, res) {
  const { EmpresaRepository, AuthRepository, transaction, RolRepository, UsuarioRepository, PermisoRepository } = repositories;

  async function listar (params) {
    try {
      const empresas = await EmpresaRepository.findAll(params);
      return empresas;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const empresa = await EmpresaRepository.findOne(params);
      if (!empresa) {
        throw new Error('La empresa no existe');
      }
      return empresa;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar empresa');
    let empresa;
    let rol;
    let usuario;
    let msgtexto = '| ';
    let transaccion;
    const dataRol = {
      nombre      : 'ROL SUPER ADMIN',
      descripcion : 'Rol administrador.'
    };
    const dataUsuario = {};
    const dataEmpresa = Service.quitarEspacioVacioPrincFin(data);

    if (!dataEmpresa.id) {
      const idParametroNIT = await EmpresaRepository.idParametroTipoDocNIT();
      dataEmpresa.idParametro = idParametroNIT.get('id'); // UUID

      const str = dataEmpresa.numeroDocumento;
      const ultimosTresDig = str.substring(str.length - 3);
      const numNoCero = Number(ultimosTresDig);
      if (numNoCero >= 10 && numNoCero <= 19) {
        dataEmpresa.empresaUnipersonal = true; // considerado como empresa unipersonal
      } else if (numNoCero >= 20 && numNoCero <= 29) {
        dataEmpresa.empresaUnipersonal = false; // considerados como empresas jurídicas
      } else {
        throw new Error(
          'El número de NIT ingresado no es correcto, verifique y digite nuevamente.'
        );
      }

      try {
        transaccion = await transaction.create();
        const msg = await this.verifyEmpresaRegistrationExists(dataEmpresa);
        if (!Array.isArray(msg) || msg.length === 0) {
          empresa = await EmpresaRepository.createOrUpdate(dataEmpresa, transaccion);

          dataRol.idEmpresa = empresa.id;
          rol = await RolRepository.createOrUpdate(dataRol, transaccion);

          dataUsuario.idEmpresa = empresa.id;
          dataUsuario.idRol = rol.id;
          dataUsuario.idTipoDocumento = empresa.idParametro;
          dataUsuario.email = dataEmpresa.email;
          dataUsuario.contrasena = await AuthRepository.codificarContrasena(dataEmpresa.contrasena);
          usuario = await UsuarioRepository.createOrUpdate(dataUsuario, transaccion);

          if (usuario.idRol) {
            await PermisoRepository.setInsertPermiso(usuario);
          }

          await transaction.commit(transaccion);
          return empresa;
        } else {
          msg.forEach(function (v) { msgtexto += v; msgtexto += ' | '; });
          throw new Error(
            'Ya se encuentra registrado la Empresa con: ' + msgtexto
          );
        }
      } catch (err) {
        await transaction.rollback(transaccion);
        throw new ErrorApp(err.message, 400);
      }
    } else {
      try {
        empresa = await EmpresaRepository.createOrUpdate(dataEmpresa);
        return empresa;
      } catch (err) {
        throw new ErrorApp(err.message, 400);
      }
    }
  }

  const verifyEmpresaRegistrationExists = async (data) => {
    const msg = [];
    const existNIT = await EmpresaRepository.existsNumNIT(data);
    const existEmail = await UsuarioRepository.verificarCorreoElectronico(data);
    if (existNIT !== null) {
      msg.push('Número de NIT: ' + existNIT.numeroDocumento);
    }
    if (existEmail !== null) {
      msg.push('Correo electrónico: ' + existEmail.email);
    }
    return msg;
  };

  async function deleteItem (id) {
    debug('Eliminando empresa', id);
    try {
      const resultado = await EmpresaRepository.deleteItem(id);
      return resultado;
    } catch (err) {
      debug(err);
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findOne,
    listar,
    createOrUpdate,
    verifyEmpresaRegistrationExists,
    deleteItem
  };
};
