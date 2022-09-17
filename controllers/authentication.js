const db = require("../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { generateJWT } = require("../security")

const registerUser = async (req, res) => {
  const user = req.body

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
  // console.log(newUser);
  const token = generateJWT({ payload: user })
  res.status(StatusCodes.CREATED).json({
    id: newUser.id,
    name: user.firstName + " " + user.lastName,
    token: token
  })
}


module.exports = {
  registerUser,
}