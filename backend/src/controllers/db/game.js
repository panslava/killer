const gameModel = require('../../models/Game')

exports.getAllPlayers = async function (gameId) {
  let game = await gameModel.findById(gameId)
  return game.players
}

exports.clearPlayers = async function (gameId) {
  return gameModel.findByIdAndUpdate(gameId, { $set: { players: [] } })
}

exports.insertPlayers = async function (gameId, userArray) {
  return gameModel.findByIdAndUpdate(gameId, {
    $set: { players: { $each: userArray } }
  })
}

exports.create = async function (game) {
  return gameModel.create(game)
}

exports.dropCollection = async function () {
  return gameModel.collection.drop()
}

exports.registerPlayer = async function (userId, gameId) {
  await gameModel.findByIdAndUpdate(gameId, {
    $push: { players: { userInfo: userId } }
  })
  return gameModel
    .findById(gameId)
    .populate('players.userInfo')
    .exec((err, game) => {
      if (err) {
        console.error(err)
      }
      else {
      }
    })
}

exports.getAllGames = async function () {
  return gameModel.find()
}
