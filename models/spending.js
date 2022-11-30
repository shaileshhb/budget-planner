'use strict';

const { v4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spending extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spending.belongsTo(models.envelop)
    }
  }
  spending.init({
    userId: DataTypes.UUID,
    envelopId: DataTypes.UUID,
    payee: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    spendingType: DataTypes.STRING,
    date: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'spending',
    paranoid: true,
  });

  spending.beforeCreate(spending => spending.id = v4());

  return spending;
};