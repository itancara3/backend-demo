
module.exports = {
  numeroDocumento: {
    presence : true,
    length   : {
      minimum : 4,
      message : '​Debe tener al menos 4 caracteres'
    }
  },
  nombreEmpresa: {
    presence : true,
    length   : {
      minimum : 4,
      message : '​Debe tener al menos 4 caracteres'
    }
  },
  correoElectronico: {
    presence : true,
    length   : {
      minimum : 4,
      message : '​Debe tener al menos 4 caracteres'
    }
  },
  contrasena: {
    presence : true,
    length   : {
      minimum : 4,
      message : '​Debe tener al menos 4 caracteres'
    }
  }
};
