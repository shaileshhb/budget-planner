const db = require("../../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors');
const { Op } = require("sequelize")

const updateUser = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const user = req.body
    user.id = req.params.userID

    // check if email exist
    const findUser = await db.user.findOne({
      where: {
        id: user.id,
      }
    })

    if (!findUser) {
      throw new CustomError.BadRequestError("user not found")
    }

    await validateUser(user)

    await db.user.update(user, {
      where: {
        id: user.id
      },
      transaction: transaction,
    })

    res.status(StatusCodes.ACCEPTED).json(null)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }

}

const getUser = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userID = req.params.userID

    const user = await db.user.findOne({
      where: {
        id: userID
      }
    })

    if (!user) {
      throw new CustomError.BadRequestError(err)
    }

    res.status(StatusCodes.OK).json(user)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }

}

const validateUser = async (user) => {

  if (!user.email) {
    throw new CustomError.BadRequestError("email must be specified")
  }

  if (!user.username) {
    throw new CustomError.BadRequestError("username must be specified")
  }

  // check if email exist
  const findEmail = await db.user.findOne({
    where: {
      id: { [Op.ne]: user.id },
      email: user.email
    }
  })

  if (findEmail) {
    throw new CustomError.BadRequestError("Email already exist")
  }

  // check if username exist
  const findUsername = await db.user.findOne({
    where: {
      id: { [Op.ne]: user.id },
      username: user.username
    }
  })

  if (findUsername) {
    throw new CustomError.BadRequestError("Username already exist")
  }
}

module.exports = {
  getUser,
  updateUser,
}