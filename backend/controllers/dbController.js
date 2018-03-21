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

exports.updateUserPhoto = function (id, photoName) {
    return userModel.findOneAndUpdate({_id: id}, {$set: {photo: photoName}}, {new: true})
}

exports.updateUserPhotoState = function (id, newState) {
    return userModel.findOneAndUpdate({_id: id}, {$set: {photoState: newState}}, {new: true})
}