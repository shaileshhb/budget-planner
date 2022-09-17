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

const registerUser = async (req, res) => {
  const user = req.body
  console.log("user -> ", user);

  // validating user

  // check if email exist
  const findEmail = await db.User.findOne({
    where: {
      email: user.email
    }
  });

  if (findEmail) {
    throw new CustomError.BadRequestError("Email already exist")
  }


  // add/register user
  const newUser = await db.User.create(user)
  console.log(newUser);
  res.status(StatusCodes.CREATED).json(user.id)
}


module.exports = {
  registerUser,
  addUser,
}