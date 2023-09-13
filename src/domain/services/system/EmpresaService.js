'use strict';

const debug = require('debug')('app:service:auth');
const { ErrorApp } = require('../../lib/error');

module.exports = function empresaService (repositories, helpers, res) {
  const { EmpresaRepository, AuthRepository } = repositories;

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
    const idParametroNIT = await EmpresaRepository.idParametroTipoDocNIT();    
    data.idParametro = idParametroNIT.get('id'); //UUID
    const str = data.numeroDocumento;
    const ultimosTresDig = str.substring(str.length - 3);
    const numNoCero = Number(ultimosTresDig);
    if(numNoCero >= 10 && numNoCero <= 19){
      data.empresaUnipersonal = true; //considerado como empresa unipersonal
    }else if(numNoCero >= 20 && numNoCero <= 29){
      data.empresaUnipersonal = false; //considerados como empresas jurídicas
    }
    data.contrasena = await AuthRepository.codificarContrasena(data.contrasena);
  
    try {
      const existeEmpresa = await EmpresaRepository.existsCompany(data);
      //console.log(existeEmpresa);
      if (existeEmpresa.count > 0) {
        throw new Error('Ya existe el registro de la empresa con número de NIT: '+data.numeroDocumento);
      }else{
        empresa = await EmpresaRepository.createOrUpdate(data);
        return empresa; 
      }
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

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
    deleteItem
  };
};
