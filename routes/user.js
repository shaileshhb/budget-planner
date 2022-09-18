const express = require("express")
const userRouter = express.Router()

const { registerUser, login } = require('../controllers/authentication')

// router.post("/", (req, res) => {
//   console.log(" at api/v1 get request");
//   res.status(200).send("<h1>Test...</h1>")
// })

userRouter.post("/test", (req, res) => {
  console.log("at api/v1 post request");
  res.status(200).send("<h1>Test...</h1>")
})

userRouter.post('/register', registerUser)
userRouter.post('/login', login)

module.exports = userRouter;