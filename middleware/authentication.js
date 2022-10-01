require("dotenv").config()
const jwt = require("jsonwebtoken");
const CustomError = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError.UnauthenticatedError("token not provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    throw new CustomError.UnauthenticatedError("route cannot be acccessed");
  }
};

module.exports = authenticationMiddleware;