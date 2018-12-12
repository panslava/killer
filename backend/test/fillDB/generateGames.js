const jsf = require('json-schema-faker')
const gameDB = require('../../src/controllers/db/game')
const gameSchema = require('./fakerSchemas/fakerGame')

module.exports = async function (count) {
  try {
    await gameDB.dropCollection()
  }
  catch (err) {
    console.log(err)
  }
  for (let i = 0; i < count; i++) {
    let game = await jsf.resolve(gameSchema)
    await gameDB.create(game)
  }
}
