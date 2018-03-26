const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController.js')

router.post('/shuffle', adminController.shuffle)
router.post('/get-all', adminController.getAllUsers)
router.post('/accept-photo', adminController.acceptPhoto)
router.post('/reject-photo', adminController.rejectPhoto)

module.exports = router
