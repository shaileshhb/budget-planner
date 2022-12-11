'use strict';
const { v4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userEnvelop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userEnvelop.hasMany(models.userTransaction, { foreignKey: 'envelopId' })
    }
  }
  userEnvelop.init({
    userId: DataTypes.UUID,
    accountId: DataTypes.UUID,
    amount: DataTypes.DECIMAL,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userEnvelop',
    paranoid: true,
    tableName: 'userEnvelops',
  });

  userEnvelop.beforeCreate(userEnvelop => userEnvelop.id = v4());

  return userEnvelop;
};