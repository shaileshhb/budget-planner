const db = require("../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');

const addUser = async (req, res) => {
  // const user = await db.User.build({
  //   firstName: "firstName",
  //   lastName: "lastName",
  //   email: "lastName@asasd.asd"
  // })
  // user.save()

  const user = await db.User.create({
    firstName: "shailesh",
    lastName: "b",
    email: "shaileshb@gmail.com"
  })

  res.status(StatusCodes.CREATED).json(user.id)
}


module.exports = {
  addUser,
}