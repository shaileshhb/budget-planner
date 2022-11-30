const express = require("express")
const router = express.Router()

// middleware
const authenticationMiddleware = require('../../middleware/authentication')

const { getUser, updateUser } = require('../controllers/user.controller')

router.get('/user/:userID', authenticationMiddleware, getUser)
router.put('/user/:userID', authenticationMiddleware, updateUser)

module.exports = router;