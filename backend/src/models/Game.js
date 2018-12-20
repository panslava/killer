const mongoose = require('mongoose')
const connection = require('../config/db.js')

const PlayerSchema = mongoose.Schema(
    {
        userInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        tryCount: {
            // if >= 3 - die
            type: Number,
            min: 0,
            max: 3,
            default: 0
        },
        victimInd: {
            type: Number
        },
        killerInd: {
            type: Number
        },
        lifeState: {
            // false - dead, true - alive
            type: Boolean,
            default: true
        },
        deathTime: {
            type: Date
        },
        entrCount: {
            type: Number
        },
        killCount: {
            type: Number,
            default: 0
        },
        gameId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        }
    },
    {
        timestamps: true
    }
)

const GameSchema = mongoose.Schema(
    {
        players: [PlayerSchema],
        settings: {
            gameState: {
                type: String,
                enum: ['Registration', 'Game', 'End']
            },
            timeForKill: {
                type: Number
            },
            startTime: {
                type: Date
            }
        }
    },
    {
        timestamps: true
    }
)

const Game = connection.model('Game', GameSchema)

module.exports = Game
