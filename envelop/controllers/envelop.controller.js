const db = require("../../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors');

const addEnvelop = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.params.userID
    const userEnvelop = req.body

    if (userEnvelop.amount <= 0) {
      throw new CustomError.BadRequestError("Amount must be greater than 0.")
    }

    userEnvelop.userId = userId

    await doesUserExist(userId)
    await doesUserSalaryExist(userId, userEnvelop.salaryId)

    const userEnvelopCount = await db.userEnvelop.count({
      where: {
        userId: userId,
      }
    })

    console.log(`envelop count ${userEnvelopCount}`);

    if (userEnvelopCount == 10) {
      throw new CustomError.BadRequestError("maximum envelops created")
    }

    await doesEnvelopNameExist(userEnvelop.name)

    await db.userEnvelop.create(userEnvelop, { transaction: transaction })
    await transaction.commit()

    res.status(StatusCodes.CREATED).json(null)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }
}

const updateEnvelop = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.params.userID
    const envelopId = req.params.envelopID
    const userEnvelop = req.body

    if (userEnvelop.amount <= 0) {
      throw new CustomError.BadRequestError("Amount must be greater than 0.")
    }

    userEnvelop.userId = userId

    await doesUserExist(userId)
    await doesUserSalaryExist(userId, userEnvelop.salaryId)

    const findEnvelop = await db.userEnvelop.findOne({
      where: {
        id: envelopId
      }
    })

    if (!findEnvelop) {
      throw new CustomError.BadRequestError("Envelop not found")
    }

    userEnvelop.id = envelopId

    await doesEnvelopNameExist(userEnvelop.name)

    await db.userEnvelop.update(userEnvelop, {
      where: {
        id: envelopId
      },
      transaction: transaction,
    })
    await transaction.commit()

    res.status(StatusCodes.ACCEPTED).json(null)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }

}

const deleteEnvelop = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.params.userID
    const envelopId = req.params.envelopID

    await doesUserExist(userId)

    const findEnvelop = await db.userEnvelop.findOne({
      where: {
        id: envelopId
      }
    })

    if (!findEnvelop) {
      throw new CustomError.BadRequestError("Envelop not found")
    }

    await db.userEnvelop.destroy({
      where: {
        id: envelopId,
      },
      transaction: transaction,
    })
    await transaction.commit()

    res.status(StatusCodes.ACCEPTED).json(null)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }
}

const getEnvelops = async (req, res) => {

  const transaction = await db.sequelize.transaction();

  try {
    const query = req.query
    console.log("query is -> ", query);
    const currentMonth = new Date().getMonth() + 1
    console.log(currentMonth);

    // var fromMonth = (fromDateMonth.getMonth()+ 1) < 10 ? '0' + (fromDateMonth.getMonth()+1) : (fromDateMonth.getMonth()+1);

    const userEnvelops = await db.userEnvelop.findAll({
      where: query,
      order: [
        ['createdAt', 'ASC']
      ],
      include: [{
        model: db.userTransaction,
        // as: 'userTransactions',
        required: false,
        where: {
          date: {
            $and: db.sequelize.where(db.sequelize.fn("month", db.sequelize.col("date")), currentMonth)
          }
        }
      }]
    })

    await transaction.commit()
    res.status(StatusCodes.OK).json(userEnvelops)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }

}

const doesUserExist = async (userId) => {
  const findUser = await db.user.findOne({
    where: {
      id: userId,
    }
  })

  if (!findUser) {
    throw new CustomError.BadRequestError("user not found")
  }
}

const doesUserSalaryExist = async (userId, salaryId) => {
  const findUser = await db.userSalary.findOne({
    where: {
      id: salaryId,
      userId: userId,
    }
  })

  if (!findUser) {
    throw new CustomError.BadRequestError("user not found")
  }
}

const doesEnvelopNameExist = async (envelopName) => {
  const findUserEnvelop = await db.userEnvelop.findOne({
    where: {
      name: envelopName
    }
  })

  if (findUserEnvelop) {
    throw new CustomError.BadRequestError("You have already created envelop with same name")
  }
}

module.exports = {
  addEnvelop,
  updateEnvelop,
  deleteEnvelop,
  getEnvelops,
}