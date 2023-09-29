
'use strict';
const debug = require('debug')('app:controller:REPORTE');
const { Respuesta } = require('../../../lib/respuesta');
const { Finalizado, HttpCodes } = require('../../../lib/globals');
const clienteSchema = require('../../schemas/system/ClienteSchema');
const validateObj = require('../../schemas/Validate');

module.exports = function setupClienteController (services) {
  const { ClienteService } = services;

  async function listar (req, res) {
    try {
      const respuesta = await ClienteService.listar(req.query);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function listarPorEmpresa (req, res) {
    try {
      const { id } = req.params;
      const respuesta = await ClienteService.listarPorEmpresa(id);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function mostrar (req, res) {
    try {
      // const data = req.params;
      const { id } = req.params;
      const respuesta = await ClienteService.mostrar(id);
      // const respuesta = await ClienteService.mostrar(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function crear (req, res) {
    try {
      const data = req.body;
      // console.log(data);
      debug('creando cliente');
      const resposeValidation = await validateObj(data, clienteSchema, res);
      if (resposeValidation) {
        return res.status(200).send(new Respuesta('OK', Finalizado.OK, resposeValidation));
      }
      console.log(data);
      data.userCreated = req.user.idUsuario;
      const respuesta = await ClienteService.createOrUpdate(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function actualizar (req, res) {
    try {
      debug('actualizando cliente');
      const data = req.body;
      data.id = req.params.id;
      data._user_updated = req.user.idUsuario;
      const respuesta = await ClienteService.createOrUpdate(data);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function eliminar (req, res) {
    try {
      const { id } = req.params;
      debug('Eliminando cliente');
      const respuesta = await ClienteService.deleteItem(id);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function findAllTipoDocumentoIdentidad (req, res) {
    const { id } = req.params;
    try {
      const respuesta = await ClienteService.findAllTipoDocumentoIdentidad(id);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  return {
    listar,
    listarPorEmpresa,
    mostrar,
    crear,
    actualizar,
    eliminar,
    findAllTipoDocumentoIdentidad
  };
};
