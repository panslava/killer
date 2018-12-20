const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

const passport = require('./../config/passport')

function isAuthenticated (req, res, next) {
  console.log(`isAuthenticated attempt`)
  console.log(`req.body: ${JSON.stringify(req.body, 0, 2)}`)
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      console.log(`Access denied`)
      console.log(`User: ${JSON.stringify(user, 0, 2)}`)
      console.log(`Errors: ${JSON.stringify(err, 0, 2)}`)

      res.status(403).send({
        error: 'Access denied'
      })
    }
    else {
      console.log(`Auth success`)
      console.log(`User: ${user}`)

      req.user = user
      next()
    }
  })(req, res, next)
}

router.post('/register', userController.createUser)
router.post('/update-photo', isAuthenticated, userController.updateUserPhoto)
router.post('/auth', userController.authorize)
// router.post('/kill', userController.kill)

module.exports = router
