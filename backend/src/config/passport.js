const PassportJWT = require('passport-jwt')
const ExtractJWT = PassportJWT.ExtractJwt
const StrategyJWT = PassportJWT.StrategyJWT
const config = require('.')

const User = require('../models/User')

module.exports = passport => {
    const parameters = {
        secretOrKey: config.authentication.jwtSecret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    }
    passport.use(
        new StrategyJWT(parameters, async function (jwtPayload, done) {
            try {
                let user = await User.findbyId(jwtPayload.id)
                if (!user) return done(null, false)

                return done(null, user)
            }
            catch (err) {
                console.error(err)
                return done(err, false)
            }
        })
    )
}
