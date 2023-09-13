"use strict";

const { setTimestampsSeeder } = require("../lib/util");

// Datos de producción
let items = [
  {
    id: "40c3ddc2-e839-451d-95c9-a259ea781751",
    codigo: "TK",
    grupo: "CONFIG",
    nombre: "TIEMPO DEL TOKEN",
    descripcion: "240",
    tipo: "SIN",
    ruta: null,
    otros:null,
    id_padre: null,
    estado: "ACTIVO",
  },
  // Tipo de documento
  {
    id: "7f295982-6e6c-4424-b1f5-26c2dd21d5f2",
    codigo: "1",
    grupo: "TIPO_DOCUMENTO_IDENTIDAD",
    nombre: "CI",
    descripcion: "CEDULA DE IDENTIDAD",
    tipo: "SIN",
    ruta: null,
    otros:null,
    id_padre: null,
    estado: "ACTIVO",
  },  
  {
    id: "1d1866c6-4cc6-4957-a308-8638b8560355",
    codigo: "2",
    grupo: "TIPO_DOCUMENTO_IDENTIDAD",
    nombre: "CEX",
    descripcion: "CEDULA DE IDENTIDAD DE EXTRANJER",
    tipo: "SIN",
    ruta: null,
    otros: null,
    id_padre: null,
    estado: "ACTIVO",
  },
  {
    id: "37f9091a-86ee-4431-97b5-4e97917d14c6",
    codigo: "3",
    grupo: "TIPO_DOCUMENTO_IDENTIDAD",
    nombre: "PAS",
    descripcion: "PASAPORTE",
    tipo: "SIN",
    ruta: null,
    otros: null,
    id_padre: null,
    estado: "ACTIVO",
  },
  {
    id: "112e1cde-0ac1-465a-aa5e-64d7e2f6ae42",
    codigo: "4",
    grupo: "TIPO_DOCUMENTO_IDENTIDAD",
    nombre: "OD",
    descripcion: "OTRO DOCUMENTO DE IDENTIDAD",
    tipo: "SIN",
    ruta: null,
    otros: null,
    id_padre: null,
    estado: "ACTIVO",
  },
  {
    id: "83cf2636-ce74-4ef4-ab17-04c68d8fd89c",
    codigo: "5",
    grupo: "TIPO_DOCUMENTO_IDENTIDAD",
    nombre: "NIT",
    descripcion: "NÚMERO DE IDENTIFICACIÓN TRIBUTARIA",
    tipo: "SIN",
    ruta: null,
    otros: null,
    id_padre: null,
    estado: "ACTIVO",
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert("sys_parametro", items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf("already exists") > -1) return;
        console.error(error);
      });
  },
  down(queryInterface, Sequelize) {},
};
