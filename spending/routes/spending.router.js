const express = require("express")
const router = express.Router()

// middleware
const authenticationMiddleware = require('../../middleware/authentication')

const { addSpending, updateSpending, deleteSpending, getSpendings } = require("../controllers/spending.controller")

router.post("/user/:userId/spendings", authenticationMiddleware, addSpending)
router.put("/user/:userId/spendings/:spendingId", authenticationMiddleware, updateSpending)
router.delete("/user/:userId/spendings/:spendingId", authenticationMiddleware, deleteSpending)
router.get("/spendings", authenticationMiddleware, getSpendings)

module.exports = router;