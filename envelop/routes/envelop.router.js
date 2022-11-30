const express = require("express")
const router = express.Router()

// middleware
const authenticationMiddleware = require('../../middleware/authentication')

const { addEnvelop, updateEnvelop, deleteEnvelop, getEnvelops } = require('../controllers/envelop.controller')

router.post('/user/:userID/envelops', authenticationMiddleware, addEnvelop)
router.put('/user/:userID/envelops/:envelopID', authenticationMiddleware, updateEnvelop)
router.delete('/user/:userID/envelops/:envelopID', authenticationMiddleware, deleteEnvelop)
router.get('/envelops', authenticationMiddleware, getEnvelops)

module.exports = router;