const jwt = require("jsonwebtoken")

const generateJWT = ({ payload }) => {
  console.log(payload);
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "10d",
  })
}

const validateToken = ({ token }) => {
  jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  generateJWT,
  validateToken,
}