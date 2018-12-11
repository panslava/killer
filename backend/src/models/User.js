const mongoose = require('mongoose')
const connection = require('../config/db.js')

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true
    },
    password: {
      type: String
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
      type: Number,
      min: 1,
      max: 8
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
      type: Number,
      min: 0,
      max: 3
    },
    modMessage: {
      type: String
    },
    deathCode: {
      // 4 numbers
      type: String,
      trim: true,
      minlength: 4,
      maxlength: 4,
      match: /^[0-9]{4}$/
    },
    admin: {
      // false - user, true - admin
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

const User = connection.model('User', userSchema)

module.exports = User
