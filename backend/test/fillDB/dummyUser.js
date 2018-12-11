const userModel = require('../../src/models/User')
const gameModel = require('../../src/models/Game')
const dummy = require('mongoose-dummy')

function generateUser () {
  return dummy(userModel)
}

function generateGame () {
  return dummy(gameModel)
}

console.log(generateUser())
console.log(generateGame())
