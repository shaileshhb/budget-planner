const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(8)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

const comparePassword = async (password, hashedPassword) => {
  const isMatched = await bcrypt.compare(password, hashedPassword);
  return isMatched
}

module.exports = {
  hashPassword,
  comparePassword,
}