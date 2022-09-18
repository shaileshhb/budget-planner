const db = require("../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { generateJWT, hashPassword, comparePassword, createUserPayload } = require("../security")

const registerUser = async (req, res) => {

  try {
    const user = req.body

    // check if email exist
    const findEmail = await db.User.findOne({
      where: {
        email: user.email
      }
    })
  
    if (findEmail) {
      throw new CustomError.BadRequestError("Email already exist")
    }
  
    user.password = await hashPassword(user.password)
    console.log(user.password);
  
    // add/register user
    const newUser = await db.User.create(user)

    const payload = createUserPayload(newUser)
    const token = generateJWT({ payload: payload })

    res.status(StatusCodes.CREATED).json({
      id: newUser.id,
      name: user.name,
      token: token
    })

  } catch (err) {
    console.log(err);
    throw new CustomError.BadRequestError(err)
  }

}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomError.BadRequestError("Email or password not specified")
  }

  const user = await db.User.findOne({
    where: {
      email: email
    }
  })

  if (!user) {
    throw new CustomError.UnauthorizedError("email or password is invalid")
  }

  const isMatched = await comparePassword(password, user.password)

  if (!isMatched) {
    throw new CustomError.UnauthorizedError("email or password is invalid")
  }

  const token = generateJWT({ payload: createUserPayload(user) })

  res.status(StatusCodes.CREATED).json({
    id: user.id,
    name: user.firstName + " " + user.lastName,
    token: token
  })
}


module.exports = {
  registerUser,
  login,
}