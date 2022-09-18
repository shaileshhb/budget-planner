require("dotenv").config()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
  dialect: 'mysql',
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  logging: console.log,
})

module.exports = sequelize;