var mongoose = require('mongoose')
var connection = require('../config/db.js')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true
  },
  name: {
    first: {
      type: String,
      trim: true
    },
    last: {
      type: String,
      trim: true
    }
  },
  course: {
    // бакалавры: 1-4, магистры: 5-6, аспирант: 7, преподаватель: 8 (а вдруг :D)
    type: Number
  },
  photo: {
    type: String,
    trim: true
  },
  vk: {
    type: String,
    trim: true
  },
  photoState: {
    //  0 - не загружена, 1 - ожидает модерации, 2 - не прошла модерацию, 3 - прошла модерацию
    type: Number
  },
  modMessage: {
    type: String
  },
  deathCode: {
    // 4 numbers
    type: String,
    trim: true
  },
  tryCount: {
    // if >= 3 - die
    type: Number
  },
  victimId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  killerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lifeState: {
    // false - dead, true - alive
    type: Boolean
  },
  deathTime: {
    type: Date
  },
  entrCount: {
    type: Number
  },
  killCount: {
    type: Number
  },
  admin: {
    // false - user, true - admin
    type: Boolean
  }
})

var User = connection.model('User', userSchema)

module.exports = User
