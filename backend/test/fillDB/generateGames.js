const jsf = require('json-schema-faker')
const gameDB = require('../../src/controllers/db/game')
const gameSchema = require('./fakerSchemas/fakerGame')

async function fillGameCollection () {
  try {
    await gameDB.dropCollection()
  }
  catch (err) {
    console.log(err)
  }
  for (let i = 0; i < 3; i++) {
    let game = await jsf.resolve(gameSchema)
    await gameDB.create(game)
  }
}

fillGameCollection()
