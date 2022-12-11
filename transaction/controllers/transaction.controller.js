const db = require("../../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors');

const addUserTransaction = async (req, res) => {

  const transaction = await db.sequelize.transaction()

  try {
    const userId = req.params.userId
    const userTransaction = req.body

    userTransaction.userId = userId

    await validateUserTransaction(userTransaction)

    if (!userTransaction.date || userTransaction.date === "") {
      userTransaction.date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
    }

    console.log("date -> ", userTransaction.date);

    await db.userTransaction.create(userTransaction, { transaction: transaction })
    await transaction.commit()

    res.status(StatusCodes.CREATED).json(null)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }
}

const updateUserTransaction = async (req, res) => {
  const transaction = await db.sequelize.transaction()

  try {
    const userId = req.params.userId
    const userTransactionId = req.params.transactionId

    const userTransaction = req.body
    userTransaction.id = userTransactionId
    userTransaction.userId = userId
    
    await validateUserTransaction(userTransaction)

    const findUserTransaction = await db.userTransaction.findOne({
      where: {
        id: userTransactionId,
      }
    })

    if (!findUserTransaction) {
      throw new CustomError.BadRequestError("spending not found")
    }

    await db.userTransaction.update(userTransaction, {
      where: {
        id: userTransactionId
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

const deleteUserTransaction = async (req, res) => {

  const transaction = await db.sequelize.transaction()

  try {
    const userTransactionId = req.params.transactionId

    const findUserTransaction = await db.userTransaction.findOne({
      where: {
        id: userTransactionId,
      }
    })

    if (!findUserTransaction) {
      throw new CustomError.BadRequestError("spending not found")
    }
    
    await db.userTransaction.destroy({
      where: {
        id: userTransactionId,
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

const validateUserTransaction = async (spending) => {

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

const getUserTransaction = async (req, res) => {
  
  const transaction = await db.sequelize.transaction();

  try {
    const query = req.query
    console.log(query);

    const userTransactions = await db.userTransaction.findAll({
      where: query,
      order: [
        ['createdAt', 'DESC']
      ]
    })

    await transaction.commit()
    res.status(StatusCodes.OK).json(userTransactions)

  } catch (error) {
    console.error(error);

    await transaction.rollback()
    throw new CustomError.BadRequestError(error)
  }
}

module.exports = {
  addUserTransaction,
  updateUserTransaction,
  deleteUserTransaction,
  getUserTransaction,
}