const express = require("express")
const router = express.Router()

// middleware
const authenticationMiddleware = require('../../middleware/authentication')

const { addUserSalary, updateUserSalary, deleteUserSalary, getUserSalaries } = require('../controllers/salary.controller')

router.post('/user/:userId/salary', authenticationMiddleware, addUserSalary)
router.put('/user/:userId/salary/:salaryId', authenticationMiddleware, updateUserSalary)
router.delete('/user/:userId/salary/:salaryId', authenticationMiddleware, deleteUserSalary)
router.get('/user-salary', authenticationMiddleware, getUserSalaries)

module.exports = router;