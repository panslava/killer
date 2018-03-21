const userModel = require('../models/user.js')

exports.createUser = function (user) {
    return userModel.create(user)
}

exports.findUserByEmail = function (email) {
    return userModel.find({'email': email})
}

exports.findUserById = function(id) {
    return userModel.find({_id: id})
}

exports.updateUserById = function (id, updateObject) {
    return userModel.findByIdAndUpdate(id, updateObject, {new: true})
}