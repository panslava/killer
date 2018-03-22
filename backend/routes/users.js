const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')

router.post('/add', userController.create_user_post)
router.post('/update-photo', userController.update_user_photo)

module.exports = router