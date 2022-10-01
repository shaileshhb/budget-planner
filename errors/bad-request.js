const { StatusCodes } = require('http-status-codes');
const CustomError = require('./custom-error')

class BadRequestError extends CustomError {
  constructor(errorMessage) {
    super(errorMessage)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError