'use stric';

const debug = require('debug')('app.service:rol');
const { ErrorApp } = require('../../lib/error');
const moment = require('moment');

module.exports = function sucursalService (repositories, helpers, res) {
  const {
    SucursalRepository,
    transaction
  } = repositories;

  async function listarSucursales (params) {
    try {
      return SucursalRepository.findAll(params);
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function listarSucursalesPorEmpresa (id) {
    try {
      return SucursalRepository.findAllByIdEmpresa(id);
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function mostrar (id) {
    try {
      return SucursalRepository.findOne({ id });
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar rol');
    let transaccion;
    try {
      transaccion = await transaction.create();
      const existeSucursal = await SucursalRepository.verificarNroSucursal({
        nroSucursal: data.nroSucursal
      });
      //   if (data.id) {
      //     existeSucursal = await SucursalRepository.findOne({
      //       id          : data.id,
      //       nroSucursal : data.nroSucursal
      //     }, transaccion);s
      //   }

      if (existeSucursal) {
        if (existeSucursal.nroSucursal === data.nroSucursal) {
          if (!data.id || data.id !== existeSucursal.id) {
            throw new Error(
                `Ya se encuentra registrado la sucursal Nro: "${data.nroSucursal}"`
            );
          }
          // if (data.id !== existeSucursal.id) {
          //   throw new Error(
          //     `Ya se encuentra registrado una sucursal con el numero de sucursal "${data.nroSucursal}"`
          //   );
          // }
        }
      }
      const sucursalCreada = await SucursalRepository.createOrUpdate(data, transaccion);
      await transaction.commit(transaccion);
      return sucursalCreada;
    } catch (err) {
      await transaction.rollback(transaccion);
      throw new ErrorApp(err.message, 400);
    }
  }

  async function eliminar (id) {
    try {
      return SucursalRepository.deleteItem(id);
    } catch (error) {
      throw new ErrorApp(error.message, 400);
    }
  }

  return {
    listarSucursales,
    listarSucursalesPorEmpresa,
    mostrar,
    createOrUpdate,
    eliminar
  };
};
