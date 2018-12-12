const gameDb = require('../../src/controllers/db/game')
const userDb = require('../../src/controllers/db/user')

module.exports = async function () {
  let users = await userDb.getAllUsers()
  let games = await gameDb.getAllGames()
  for (let user of users) {
    let gameId = Math.floor(Math.random() * (games.length + 1))
    if (gameId !== games.length) {
      try {
        console.log(user._id)
        console.log(games[gameId]._id)
        await userDb.registerToGame(user._id, games[gameId]._id)
        await gameDb.registerPlayer(user._id, games[gameId]._id)
      }
      catch (err) {
        console.log(err)
      }
    }
  }
}
