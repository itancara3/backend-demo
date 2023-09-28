
'use strict';
const debug = require('debug')('app:controller:REPORTE');
const { Respuesta } = require('../../../lib/respuesta');
const { Finalizado, HttpCodes } = require('../../../lib/globals');
const ValidateJS = require('validate.js');
const EmpresaSchema = require('../../schemas/system/EmpresaSchema');

module.exports = function setupEmpresaController (services) {
  const { EmpresaService, ValidateService } = services;

  async function listar (req, res) {
    try {
      const respuesta = await EmpresaService.listar(req.query);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }
  async function findOne (req, res) {
    try {
      const data = { id: req.params.id };
      const respuesta = await EmpresaService.findOne(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function crear (req, res) {
    try {
      ValidateService.calcular(2, 3).then((result) => {
        console.log(result);
      }, (error) => {
        console.log(error);
      });
      /*
      const data = req.body;
      debug('creando entidad');
      // data.userCreated = req.user.idUsuario;
      const respuesta = await EmpresaService.createOrUpdate(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta)); */
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function actualizar (req, res) {
    try {
      debug('actualizando empresa');
      const data = req.body;
      data.id = req.params.id;
      // data._user_updated = req.user.id;
      const respuesta = await EmpresaService.createOrUpdate(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function eliminar (req, res) {
    try {
      const { id } = req.params;
      debug('Eliminando entidad');
      const respuesta = await EmpresaService.deleteItem(id);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  return {
    listar,
    findOne,
    eliminar,
    actualizar,
    crear
  };
};
