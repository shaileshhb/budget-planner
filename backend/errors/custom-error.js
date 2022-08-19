class CustomError extends Error {
  constructor(errorMessage) {
    super(errorMessage)
  }
}

module.exports = CustomError