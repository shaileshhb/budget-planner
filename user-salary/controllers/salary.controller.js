const db = require("../../models/index")
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../../errors');

const addUserSalary = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.params.userId
    const salary = req.body

    salary.userId = userId

    if (salary.salary <= 0) {
      throw new CustomError.BadRequestError("Salary must be greater than 0.")
    }

    await doesUserExist(userId)
    await doesAccountExist(userId, salary.accountId)

    await db.userSalary.create(salary, { transaction: transaction })
    await transaction.commit()

    res.status(StatusCodes.CREATED).json(null)

  } catch (err) {
    console.error(err);

    await transaction.rollback()
    throw new CustomError.BadRequestError(err)
  }
}

const updateUserSalary = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.params.userId
    const salaryId = req.params.salaryId
    const salary = req.body

    salary.userId = userId
    salary.id = salaryId

    if (salary.salary <= 0) {
      throw new CustomError.BadRequestError("Salary must be greater than 0.")
    }

    await doesUserExist(userId)
    await doesAccountExist(userId, salary.accountId)

    const findUserSalary = await db.userSalary.findOne({
      where: {
        id: salaryId
      }
    })

    if (!findUserSalary) {
      throw new CustomError.BadRequestError("Salary not found")
    }

    await db.userSalary.update(salary, {
      where: {
        id: salaryId
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

const deleteUserSalary = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const userId = req.params.userId
    const salaryId = req.params.salaryId

    await doesUserExist(userId)

    const findUserSalary = await db.userSalary.findOne({
      where: {
        id: salaryId
      }
    })

    if (!findUserSalary) {
      throw new CustomError.BadRequestError("Salary not found")
    }

    await db.userSalary.destroy({
      where: {
        id: salaryId,
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

const getUserSalaries = async (req, res) => {

  const transaction = await db.sequelize.transaction();

  try {
    const query = req.query
    console.log("query is -> ", query);

    const userSalaries = await db.userSalary.findAll({
      where: query,
      order: [
        ['createdAt', 'ASC']
      ],
    })

    await transaction.commit()
    res.status(StatusCodes.OK).json(userSalaries)

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

const doesAccountExist = async (userId, accountId) => {
  const findUserAccount = await db.userAccount.findOne({
    where: {
      id: accountId,
      userId: userId,
    }
  })

  if (!findUserAccount) {
    throw new CustomError.BadRequestError("user account not found")
  }
}


module.exports = {
  addUserSalary,
  updateUserSalary,
  deleteUserSalary,
  getUserSalaries,
}