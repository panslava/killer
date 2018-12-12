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
    $push: { players: { $each: userArray } }
  })
}

exports.create = async function (game) {
  return gameModel.create(game)
}

exports.dropCollection = async function () {
  return gameModel.collection.drop()
}
