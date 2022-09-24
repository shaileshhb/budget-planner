const db = require("../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const verifyEmailTemplate = require('../email/template/verifyEmail')
const sendMail = require("../email/email")
const { 
  generateJWT, 
  hashPassword, 
  comparePassword, 
  createUserPayload,
  encryption, 
  decryption,
 } = require("../security")

const registerUser = async (req, res) => {

  try {
    const user = req.body

    // check if email exist
    const findEmail = await db.User.findOne({
      where: {
        email: user.email
      }
    })

    // check if username exist
    const findUsername = await db.User.findOne({
      where: {
        username: user.username
      }
    })
  
    if (findEmail) {
      throw new CustomError.BadRequestError("Email already exist")
    }

    if (findUsername) {
      throw new CustomError.BadRequestError("Username already exist")
    }
  
    user.password = await hashPassword(user.password)
    console.log(user.password);
  
    // add/register user
    const newUser = await db.User.create(user)

    const payload = createUserPayload(newUser)
        
    // send verfication email to user
    const cipherText = encryption(payload.id)
    let validTime = new Date().setHours(new Date().getHours() + 3)

    const verificationLink = auth.Conf.BaseURL + "/api/v1/budget-planner/verify-email?k=" + base64.URLEncoding.EncodeToString(cipherText)
    verificationLink += "&t=" + base64.URLEncoding.EncodeToString(new Date(formatDt).toISOString())
  
    const message = verifyEmailTemplate(user.name, verificationLink)
    const emailContent = {
      ReceiverEmail: user.email,
      Subject:       "Subject: Verfiy Email Address \n",
      Message:       message,
    }

    await sendMail(emailContent)

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