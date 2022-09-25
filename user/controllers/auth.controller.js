const db = require("../../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors');
const verifyEmailTemplate = require('../../email/template/verifyEmail')
const sendMail = require("../../email/email")
const {
  generateJWT,
  hashPassword,
  comparePassword,
  createUserPayload,
  encryption,
  decryption,
} = require("../../security")

const registerUser = async (req, res) => {

  const transaction = await db.sequelize.transaction();

  try {

    const user = req.body

    await validateUser(user)

    user.password = await hashPassword(user.password)
    console.log(user.password);

    // add/register user
    const newUser = await db.User.create(user, { transaction: transaction })

    const payload = createUserPayload(newUser)
    await transaction.commit()

    await sendVerificationMail(payload)

    const token = generateJWT({ payload: payload })

    res.status(StatusCodes.CREATED).json({
      id: newUser.id,
      name: user.name,
      token: token
    })

  } catch (err) {
    console.log(err);
    await transaction.rollback()

    throw new CustomError.BadRequestError(err)
  }

}

const verifyUser = async (req, res) => {
  const { k } = req.query

  if (!k) {
    throw new CustomError.BadRequestError("Invalid link.")
  }

  const decodedCipherText = Buffer.from(k, 'base64').toString('utf8')
  const userID = decryption(decodedCipherText)

  const transaction = await db.sequelize.transaction()

  try {

    // check if userID exist
    const findUser = await db.User.findOne({
      where: {
        id: userID
      }
    })

    if (!findUser) {
      throw new CustomError.BadRequestError("Invalid link.")
    }

    const user = await db.User.update({ isVerified: true }, {
      where: {
        id: userID
      }
    })

    console.log("userid -> ", userID);
    console.log("__dirname -> ", __dirname);

    await transaction.commit()

    res.sendFile('views/verified.html', { root: __dirname })

  } catch (err) {
    console.error(err);

    await transaction.rollback()

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

const sendVerificationMail = async (payload) => {

  // send verfication email to user
  let validTime = new Date().setHours(new Date().getHours() + 1)

  const encodedCipher = Buffer.from(encryption(payload.id), 'utf8').toString('base64')

  const verificationLink = process.env.BASE_URL + "/api/v1/budget-planner/verify-email?k=" + encodedCipher

  // console.log("verificationLink -> ", verificationLink);

  const message = verifyEmailTemplate(payload.name, verificationLink)
  const emailContent = {
    recevierEmail: payload.email,
    subject: "Verfiy Email Address \n",
    message: message,
  }

  await sendMail(emailContent)
}

const validateUser = async (user) => {

  if (!user.email) {
    throw new CustomError.BadRequestError("Email must be specified")
  }

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

}


module.exports = {
  registerUser,
  verifyUser,
  login,
}