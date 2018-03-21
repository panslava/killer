var mongoose = require('mongoose')
var connection = require('../config/db.js')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
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
        type: Number //бакалавры: 1-4, магистры: 5-6, аспирант: 7, преподаватель: 8 (а вдруг :D)
    },
    photo: {
        type: String,
        trim: true
    },
    photoState: {
        type: Number //  0 - не загружена, 1 - ожидает модерации, 2 - не прошла модерацию, 3 - прошла модерацию
    },
    modMessage: {
        type: String
    },
    deathCode: {
        type: String, //4 numbers
        trim: true,
        required: true
    },
    tryCount: {
        type: Number // if >= 3 - die
    },
    victimId: {
        type: String, // _id from mongodb? is it better to use ObjectId???
        trim: true
    },
    killerId: {
        type: String, // _id from mongodb? is it better to use ObjectId???
        trim: true
    },
    lifeState: {
        type: Number // 0 - dead, 1 - alive  
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
    vk: {
        type: String,
        trim: true
    },
    admin: {
        type: Boolean //false - user, true - admin
    }
})


var User = connection.model('User', userSchema)

module.exports = User