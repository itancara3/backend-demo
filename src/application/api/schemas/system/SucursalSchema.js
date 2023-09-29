
module.exports = {
  idEmpresa: {
    presence: {
      allowEmpty : false,
      message    : '^El campo \'idEmpresa\' es requerido'
    }
  },
  nroSucursal: {
    presence: {
      allowEmpty : false,
      message    : '^El campo \'nroSucursal\' es requerido'
    },
    type: 'integer'
  }
};
