'use strict';

const { v4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userAccount.init({
    name: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'userAccount',
    tableName: 'useraccounts',
    paranoid: true,
  });

  userAccount.beforeCreate(userAccount => userAccount.id = v4());

  return userAccount;
};