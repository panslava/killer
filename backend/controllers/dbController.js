const userModel = require('../models/user.js')

exports.createUser = function (user) {
    return userModel.create(user)
}

exports.findUserByEmail = function (email) {
    return userModel.find({'email': email})
}

exports.findUserById = function(id) {
    console.log(id)
    return userModel.find({_id: id})
}

exports.getByEmailDeathcode = function (Email, DeathCode) {
    return userModel.find({email: Email, deathCode: DeathCode})
}

exports.updateUserById = function (id, updateObject) {
    return userModel.findByIdAndUpdate(id, updateObject, {new: true})
}

exports.getRandomUserList = function() {
    return new Promise (function (resolve, reject) {
        userModel.count({}, function (err, count) {
            userModel.aggregate(
                [ { $sample: { size: count } } ]
                , (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                }
            )
        })
    })
}

exports.clearUsers = function () {
    console.log('clear')
    return userModel.remove({})
}

exports.rebuildCollection = function (userArray) {
    return userModel.insertMany(userArray)
}

