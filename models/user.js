'use strict';

const { v4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.userEnvelop, { foreignKey: 'userId' })
      user.hasMany(models.userTransaction, { foreignKey: 'userId' })
      user.hasMany(models.userAccount, { foreignKey: 'userId' })
    }
  }
  user.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    contact: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    profileImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
    paranoid: true,
    tableName: 'users',
  });

  user.beforeCreate(user => user.id = v4());

  return user;
};