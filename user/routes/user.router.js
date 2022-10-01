const express = require("express")
const router = express.Router()

// middleware
const authenticationMiddleware = require('../../middleware/authentication')

const { getUser } = require('../controllers/user.controller')

router.get('/user/:userID', authenticationMiddleware, getUser)

module.exports = router;