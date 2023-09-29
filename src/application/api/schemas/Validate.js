'use strict';

const ValidateJS = require('validate.js');

module.exports = async function validateService (data, schema, res) {
  const resultadoValidacion = await ValidateJS(data, schema);
  // const test = ValidateJS.isEmpty(resultadoValidacion);
  const errores = [];

  for (const key in resultadoValidacion || []) {
    for (const error of resultadoValidacion[key]) {
      errores.push(error);
    }
  }

  return errores.join('\n ');
};
