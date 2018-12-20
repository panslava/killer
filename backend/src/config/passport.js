const PassportJWT = require('passport-jwt')
const ExtractJWT = PassportJWT.ExtractJwt
const Strategy = PassportJWT.Strategy
const config = require('.')

const User = require('../models/User')

module.exports = passport => {
  const parameters = {
    secretOrKey: config.authentication.jwtSecret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  }
  passport.use(
    new Strategy(parameters, (payload, done) => {
      User.findOne({ id: payload.id }, (error, user) => {
        if (error) return done(error, false)
        if (user) done(null, user)
        else done(null, false)
      })
    })
  )
}
