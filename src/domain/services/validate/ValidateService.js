'use strict';

module.exports = function validateService (repositories, helpers, res) {
  const calcular = (numero1, nuimero2) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const suma = numero1 + nuimero2;
        if (suma > 5) {
          resolve(numero1 + nuimero2);
        } else {
          return reject(new Error('Se produjo un error'));
        }
      }, 2000);
    });
  };

  return {
    calcular
  };
};
