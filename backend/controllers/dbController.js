const userModel = require('../models/user.js')

exports.createUser = function (user) {
    return userModel.create(user)
}

exports.findUserByEmail = function (email) {
    return userModel.find({'email': email})
}