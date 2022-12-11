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
      userAccount.hasMany(models.userEnvelop, { foreignKey: 'accountId' })
      userAccount.hasMany(models.userSalary, { foreignKey: 'accountId' })
    }
  }
  userAccount.init({
    amount: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    userId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'userAccount',
    paranoid: true,
    tableName: 'userAccounts',
  });

  userAccount.beforeCreate(userAccount => userAccount.id = v4());

  return userAccount;
};