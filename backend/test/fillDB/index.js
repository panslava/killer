const generateUsers = require('./generateUsers')
const generateGames = require('./generateGames')
const randomRegister = require('./randomRegister')

async function generate () {
  await generateUsers(100)
  await generateGames(3)
  await randomRegister()
}

generate()
