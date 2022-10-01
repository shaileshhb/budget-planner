'use strict';

const { v4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class envelop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  envelop.init({
    name: DataTypes.STRING,
    userId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'envelop',
  });

  envelop.beforeCreate(enve => enve.id = v4());

  return envelop;
};