const express = require("express")
const router = express.Router()

const { registerUser, verifyUser, login } = require('../controllers/auth.controller')

router.post('/register', registerUser)
router.get('/verify-email', verifyUser)
router.post('/login', login)

module.exports = router;