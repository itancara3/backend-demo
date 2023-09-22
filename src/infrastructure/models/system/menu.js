'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id     : util.pk,
    nombre : {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.nombre'),
      field  : 'nombre'
    },
    ruta: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.ruta')
    },
    icono: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.icono'),
      field  : 'icono'
    },
    idMenuPermiso: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.idMenuPermiso'),
      field  : 'id_menu_permiso'
    },
    orden: {
      type         : DataTypes.INTEGER,
      defaultValue : 0,
      xlabel       : lang.t('fields.orden'),
      field        : 'orden'
    },
    tipo: {
      type   : DataTypes.STRING(15),
      xlabel : lang.t('fields.tipo'),
      field  : 'tipo'
    },
    estado: {
      type         : DataTypes.ENUM,
      allowNull    : true,
      values       : ['ACTIVO', 'INACTIVO'],
      defaultValue : 'ACTIVO',
      xlabel       : lang.t('fields.estado'),
      field        : 'estado'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Menu = sequelize.define('menu', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'sys_menu_permiso'
  });

  return Menu;
};
