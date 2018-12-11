const gameModel = require('../../models/Game')

exports.getRandomList = async function (gameId) {
  let game = await gameModel.findById(gameId)
  let count = game.players.length

  let res = await gameModel.aggregate([{ $sample: { size: count } }])
  return res
}

exports.clearCollection = function () {
  return gameModel.remove({})
}

exports.rebuildCollection = function (userArray) {
  return gameModel.insertMany(userArray)
}

exports.getAll = function () {
  return gameModel.find()
}
