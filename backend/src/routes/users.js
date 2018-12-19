const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

router.post('/register', userController.createUser)
router.post('/update-photo', userController.updateUserPhoto)
router.post('/auth', userController.authorize)
// router.post('/kill', userController.kill)

module.exports = router
