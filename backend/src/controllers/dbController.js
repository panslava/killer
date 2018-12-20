const userModel = require('../models/User')
const gameModel = require('../models/Game')

exports.createUser = function (user) {
    return userModel.create(user)
}

exports.findUserByEmail = function (email) {
    return userModel.find({ email: email })
}

exports.findUserById = function (id) {
    return userModel.findById(id)
}

exports.getByEmailDeathcode = function (Email, DeathCode) {
    return userModel.find({ email: Email, deathCode: DeathCode })
}

exports.updateUserById = function (id, updateObject) {
    return userModel.findByIdAndUpdate(id, updateObject, { new: true })
}

exports.dropUsers = function () {
    return userModel.collection.drop()
}

// exports.getRandomGameUserList = async function () {
//   let count = await gameUserModel.count({})

//   let res = await gameUserModel.aggregate([{ $sample: { size: count } }])
//   return res
// }

// exports.clearGameUsers = function () {
//   return gameUserModel.remove({})
// }

// exports.rebuildGameUsers = function (userArray) {
//   return gameUserModel.insertMany(userArray)
// }

exports.isAdmin = async function (id) {
    const user = await userModel.findById(id)
    if (!user || !user.admin) return false
    else return true
}

exports.getAllUsers = function () {
    return userModel.find()
}

// exports.getAllGameUsers = function () {
//   return gameUserModel.find()
// }
