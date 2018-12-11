const userModel = require('../../src/models/User')
const gameModel = require('../../src/models/Game')

const mongoose = require('mongoose')
const fs = require('fs')

require('mongoose-schema-jsonschema')(mongoose)

let jsonSchema = userModel.jsonSchema()

fs.writeFile('./User.json', JSON.stringify(jsonSchema), err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('UserJson has been created')
})

jsonSchema = gameModel.jsonSchema()

fs.writeFile('./Game.json', JSON.stringify(jsonSchema), err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('GameJson has been created')
})
