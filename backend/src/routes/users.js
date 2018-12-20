const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

const passport = require('./../config/passport')

function isAuthenticated (req, res, next) {
    passport.authenticate('jwt', function (err, user) {
        if (err || !user) {
            res.status(403).send({
                error: 'Access denied'
            })
        }
        else {
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
