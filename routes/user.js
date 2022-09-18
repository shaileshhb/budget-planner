const express = require("express")
const router = express.Router()

const { registerUser, login } = require('../controllers/authentication')

// router.post("/", (req, res) => {
//   console.log(" at api/v1 get request");
//   res.status(200).send("<h1>Test...</h1>")
// })

router.route("/test").post((req, res) => {
  console.log(" at api/v1 get request");
  res.status(200).send("<h1>Test...</h1>")
})

router.post('/register', registerUser)
router.post('/login', login)

module.exports = router;