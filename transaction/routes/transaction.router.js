const express = require("express")
const router = express.Router()

// middleware
const authenticationMiddleware = require('../../middleware/authentication')

const { addUserTransaction, updateUserTransaction, deleteUserTransaction, getUserTransaction } = require("../controllers/transaction.controller")

router.post("/user/:userId/transactions", authenticationMiddleware, addUserTransaction)
router.put("/user/:userId/transactions/:transactionId", authenticationMiddleware, updateUserTransaction)
router.delete("/user/:userId/transactions/:transactionId", authenticationMiddleware, deleteUserTransaction)
router.get("/transactions", authenticationMiddleware, getUserTransaction)

module.exports = router;