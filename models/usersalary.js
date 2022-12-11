'use strict';
const { v4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userSalary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userSalary.init({
    userId: DataTypes.UUID,
    accountId: DataTypes.UUID,
    salary: DataTypes.DECIMAL,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'userSalary',
    paranoid: true,
    tableName: 'userSalaries',
  });

  userSalary.beforeCreate(userSalary => userSalary.id = v4());

  return userSalary;
};