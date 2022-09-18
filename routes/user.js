const express = require("express")
const router = express.Router()

const { registerUser, login } = require('../controllers/authentication')

router.post("/", (req, res) => {
  console.log(" at api/v1 get request");
  res.send("Received req", req.baseUrl)
})

router.post('/register', registerUser)
router.post('/login', login)

module.exports = router;