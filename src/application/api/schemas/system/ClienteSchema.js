
module.exports = {
  idEmpresa: {
    presence: {
      allowEmpty : false,
      message    : '^El campo \'idEmpresa\' es requerido'
    }
  },
  idTipoDocumento: {
    presence: {
      allowEmpty : false,
      message    : '^El campo \'idTipoDocumento\' es requerido'
    }
  },
  codigo: {
    presence: {
      allowEmpty : false,
      message    : '^El campo \'codigo\' es requerido'
    }
  },
  nroDocumento: {
    presence: {
      allowEmpty : false,
      message    : '^El campo \'nroDocumento\' es requerido'
    },
    length: {
      minimum  : 3,
      tooShort : '^El campo \'nroDocumento\', debe tener mínimo %{count} carácteres.'
    }
  },
  nombreFiscal: {
    presence: {
      allowEmpty : false,
      message    : '^El campo \'nombreFiscal\' es requerido'
    },
    length: {
      minimum  : 3,
      tooShort : '^El campo \'nombreFiscal\', debe tener mínimo %{count} carácteres.'
    }
  },
  nombreComercial: {
    presence: {
      allowEmpty : false,
      message    : '^El campo \'nombreComercial\' es requerido'
    },
    length: {
      minimum  : 3,
      tooShort : '^El campo \'nombreComercial\', debe tener mínimo %{count} carácteres.'
    }
  }
};
