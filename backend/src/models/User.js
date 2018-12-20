const mongoose = require('mongoose')
const connection = require('../config/db.js')
const bcrypt = require('bcrypt')

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
    },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error)
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error)
        user.password = hash
        next()
      })
    })
  }
  else {
    return next()
  }
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const User = connection.model('User', userSchema)

module.exports = User
