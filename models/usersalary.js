'use strict';
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
    salaryType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userSalary',
    paranoid: true,
  });
  return userSalary;
};