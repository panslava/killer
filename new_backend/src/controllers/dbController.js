const userModel = require('../models/user.js')

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

exports.getRandomUserList = async function () {
  let count = await userModel.count({})

  let res = await userModel.aggregate([{ $sample: { size: count } }])
  return res
}

exports.clearUsers = function () {
  return userModel.remove({})
}

exports.rebuildCollection = function (userArray) {
  return userModel.insertMany(userArray)
}

exports.isAdmin = async function (id) {
  const user = await userModel.findById(id)
  if (!user || !user.admin) return false
  else return true
}

exports.getAllUsers = function () {
  return userModel.find()
}
