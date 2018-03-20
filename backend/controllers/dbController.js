const userModel = require('../models/user.js')

exports.createUser = function (user) {
    return userModel.create(user)
}

exports.findUserByEmail = function (email) {
    return userModel.find({'email': email})
}

exports.findUserById = function(id) {
    return userModel.findById(id)
}

exports.updatePhotoToUser = function (id, photoName) {
    return userModel.findOneAndUpdate({_id: id}, {$set: {photo: photoName}}, {new: true})
}