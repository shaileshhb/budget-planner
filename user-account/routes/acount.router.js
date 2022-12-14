const express = require("express")
const router = express.Router()

// middleware
const authenticationMiddleware = require('../../middleware/authentication')

const { addUserAccount, updateUserAccount, deleteUserAccount, getUserAccounts } = require('../controllers/account.controller')

router.post('/user/:userId/accounts', authenticationMiddleware, addUserAccount)
router.put('/user/:userId/accounts/:accountId', authenticationMiddleware, updateUserAccount)
router.delete('/user/:userId/accounts/:accountId', authenticationMiddleware, deleteUserAccount)
router.get('/user-accounts', authenticationMiddleware, getUserAccounts)

module.exports = router;