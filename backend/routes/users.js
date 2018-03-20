const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')

router.post('/create', userController.create_user_post)

module.exports = router