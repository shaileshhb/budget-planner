require("dotenv").config()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
  dialect: 'mysql',
  host: process.env.HOST,
  port: process.env.DBPORT,
  logging: (...msg) => console.log(msg),
})

module.exports = sequelize;