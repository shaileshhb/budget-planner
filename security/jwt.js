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

const createUserPayload = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  }

}

module.exports = {
  generateJWT,
  validateToken,
  createUserPayload,
}