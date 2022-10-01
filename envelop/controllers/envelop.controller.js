const db = require("../../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors');

const addEnvelop = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.params.userID
    const userEnvelop = req.body

    // check if email exist
    const findUser = await db.user.findOne({
      where: {
        id: userId,
      }
    })

    if (!findUser) {
      throw new CustomError.BadRequestError("user not found")
    }

    const userEnvelopCount = await db.envelop.count({
      where: {
        userId: userId,
      }
    })

    console.log(`envelop count ${userEnvelopCount}`);

    if (userEnvelopCount == 10) {
      throw new CustomError.BadRequestError("maximum envelops created")
    }

    const findUserEvelop = await db.envelop.findOne({
      where: {
        name: userEnvelop.name
      }
    })

    if (findUserEvelop) {
      throw new CustomError.BadRequestError("You have already created envelop with same name")
    }

    await db.envelop.create(envelop, { transaction: transaction })

    res.status(StatusCodes.CREATED).json(null)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }

}