'use strict';
const { v4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userTransaction.init({
    userId: DataTypes.UUID,
    envelopId: DataTypes.UUID,
    payee: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    transactionType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userTransaction',
    paranoid: true,
    tableName: 'userTransactions',
  });

  userTransaction.beforeCreate(userTransaction => userTransaction.id = v4());

  return userTransaction;
};