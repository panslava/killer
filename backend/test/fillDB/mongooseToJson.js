const userModel = require('../../src/models/User')
const gameModel = require('../../src/models/Game')

const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

require('mongoose-schema-jsonschema')(mongoose)

let jsonSchema = userModel.jsonSchema()

const JSONFolder = './jsonSchemas'

fs.writeFile(
  path.join(JSONFolder, './UserSchema.json'),
  JSON.stringify(jsonSchema),
  err => {
    if (err) {
      console.error(err)
      return
    }
    console.log('UserJson has been created')
  }
)

jsonSchema = gameModel.jsonSchema()

fs.writeFile(
  path.join(JSONFolder, './GameSchema.json'),
  JSON.stringify(jsonSchema),
  err => {
    if (err) {
      console.error(err)
      return
    }
    console.log('GameJson has been created')
  }
)
