const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const passport = require('passport')
require('../config/passport')(passport)

function isAuthenticated(req, res, next) {
  passport.authenticate('jwt', function(err, user) {
    if (err || !user) {
      res.status(401).send({
        error: 'Access denied'
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}

router.post('/register', userController.createUser)
router.post('/update-photo', isAuthenticated, userController.updateUserPhoto)
router.post('/auth', userController.authorize)
router.post('/is-email-free', userController.isEmailFree)
router.post(
  '/get-user-by-token',
  isAuthenticated,
  userController.getUserByToken
)

// router.post('/kill', userController.kill)

module.exports = router
