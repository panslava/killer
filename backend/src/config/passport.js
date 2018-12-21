const { ExtractJwt, Strategy } = require('passport-jwt')
const config = require('.')

const User = require('../models/User')

module.exports = function (passport) {
    const parameters = {
        secretOrKey: config.jwt.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    passport.use(
        new Strategy(parameters, async function (payload, done) {
            console.log(`Payload: ${JSON.stringify(payload, 0, 2)}`)
            try {
                let user = await User.findById(payload.id)
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
