const userModel = require('../../models/User')

exports.create = function (user) {
    return userModel.create(user)
}

exports.findByEmail = function (email) {
    return userModel.findOne({ email: email })
}

exports.findById = function (id) {
    return userModel.findById(id)
}

exports.getByEmailDeathcode = function (Email, DeathCode) {
    return userModel.find({ email: Email, deathCode: DeathCode })
}

exports.updateById = function (id, updateObject) {
    return userModel.findByIdAndUpdate(id, updateObject, { new: true })
}

exports.isAdmin = async function (id) {
    const user = await userModel.findById(id)
    if (!user || !user.admin) return false
    else return true
}

exports.getAllUsers = function () {
    return userModel.find()
}

exports.dropCollection = function () {
    return userModel.collection.drop()
}

exports.registerToGame = function (userId, gameId) {
    return userModel.findByIdAndUpdate(userId, { $push: { games: gameId } })
}
