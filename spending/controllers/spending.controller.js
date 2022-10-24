const db = require("../../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors');
const spending = require("../../models/spending");

const addSpending = async (req, res) => {

  const transaction = await db.sequelize.transaction()

  try {
    const userId = req.params.userId
    const spending = req.body

    spending.userId = userId

    await validateSpending(spending)

    if (spending.date === "") {
      spending.date = new Date().toISOString()
    }

    await db.spending.create(spending, { transaction: transaction })
    await transaction.commit()

    res.status(StatusCodes.CREATED).json(null)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }
}

const updateSpending = async (req, res) => {
  const transaction = await db.sequelize.transaction()

  try {
    const userId = req.params.userId
    const spendingId = req.params.spendingId

    const spending = req.body
    spending.id = spendingId
    spending.userId = userId
    
    await validateSpending(spending)

    const findSpending = await db.spending.findOne({
      where: {
        id: spendingId,
      }
    })

    if (!findSpending) {
      throw new CustomError.BadRequestError("spending not found")
    }

    await db.spending.update(spending, {
      where: {
        id: spendingId
      },
      transaction: transaction,
    })

    await transaction.commit()

    res.status(StatusCodes.ACCEPTED).json(null)

  } catch (error) {
    console.error(error);

    await transaction.rollback()
    throw new CustomError.BadRequestError(error)
  }

}

const deleteSpending = async (req, res) => {

  const transaction = await db.sequelize.transaction()

  try {
    const spendingId = req.params.spendingId

    const findSpending = await db.spending.findOne({
      where: {
        id: spendingId,
      }
    })

    if (!findSpending) {
      throw new CustomError.BadRequestError("spending not found")
    }
    
    await db.spending.destroy({
      where: {
        id: spendingId,
      }
    }, { transaction: transaction })
    await transaction.commit()

    res.status(StatusCodes.ACCEPTED).json(null)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }
}

const validateSpending = async (spending) => {

  await doesUserExist(spending.userId)
  await doesEnvelopExist(spending.envelopId)

  if (spending.amount <= 0) {
    throw new CustomError.BadRequestError("Amount cannot be 0 or less than 0")
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

const doesEnvelopExist = async (envelopId) => {
  const findEnvelop = await db.envelop.findOne({
    where: {
      id: envelopId,
    }
  })

  if (!findEnvelop) {
    throw new CustomError.BadRequestError("envelop not found")
  }
}

const getSpendings = async (req, res) => {
  
  const transaction = await db.sequelize.transaction();

  try {
    const query = req.query
    console.log(query);

    const spendings = await db.spending.findAll({
      where: query,
      order: [
        ['createdAt', 'DESC']
      ]
    })

    await transaction.commit()
    res.status(StatusCodes.OK).json(spendings)

  } catch (error) {
    console.error(error);

    await transaction.rollback()
    throw new CustomError.BadRequestError(error)
  }
}

module.exports = {
  addSpending,
  updateSpending,
  deleteSpending,
  getSpendings,
}