const db = require("../../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors');

const addUserAccount = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.params.userId
    const account = req.body

    account.userId = userId
    
    if (account.amount <= 0) {
      throw new CustomError.BadRequestError("Amount must be greater than 0.")
    }

    await doesUserExist(userId)

    const userAccountCount = await db.userAccount.count({
      where: {
        userId: userId,
      }
    })

    console.log(`account count ${userAccountCount}`);

    if (userAccountCount == 10) {
      throw new CustomError.BadRequestError("maximum accounts created")
    }

    await db.userAccount.create(account, { transaction: transaction })
    await transaction.commit()

    res.status(StatusCodes.CREATED).json(null)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }
}

const updateUserAccount = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.params.userId
    const accountId = req.params.accountId
    const account = req.body

    account.userId = userId
    account.id = accountId

    if (account.amount <= 0) {
      throw new CustomError.BadRequestError("Amount must be greater than 0.")
    }

    await doesUserExist(userId)

    const findAccount = await db.userAccount.findOne({
      where: {
        id: accountId
      }
    })

    if (!findAccount) {
      throw new CustomError.BadRequestError("Account not found")
    }

    await db.userAccount.update(account, {
      where: {
        id: accountId
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

const deleteUserAccount = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.params.userId
    const accountId = req.params.accountId

    await doesUserExist(userId)

    const findUserAccount = await db.userAccount.findOne({
      where: {
        id: accountId
      }
    })

    if (!findUserAccount) {
      throw new CustomError.BadRequestError("Account not found")
    }

    await db.userAccount.destroy({
      where: {
        id: accountId,
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

const getUserAccounts = async (req, res) => {
  
  const transaction = await db.sequelize.transaction();

  try {
    const query = req.query
    console.log("query is -> ", query);
    
    const userAccounts = await db.userAccount.findAll({
      where: query,
      order: [
        ['createdAt', 'ASC']
      ],
    })

    await transaction.commit()
    res.status(StatusCodes.OK).json(userAccounts)

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

module.exports = {
  addUserAccount,
  updateUserAccount,
  deleteUserAccount,
  getUserAccounts,
}