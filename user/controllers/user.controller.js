const db = require("../../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors');

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

module.exports = {
  getUser,
}