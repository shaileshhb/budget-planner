// 'use strict';

const { v4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
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
    modelName: 'User',
    paranoid: true,
    tableName: 'users',
    // underscored: true,
  });

  User.beforeCreate(user => user.id = v4());

  return User;
};