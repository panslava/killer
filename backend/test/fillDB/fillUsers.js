const jsf = require('json-schema-faker')
const userDB = require('../../src/controllers/db/user')
const userSchema = require('./fakerUser')

jsf.extend('faker', () => {
  // just ignore the passed faker instance
  const faker = require('faker/locale/ru')
  // do other stuff
  return faker
})

async function fillUsersCollection () {
  await userDB.dropCollection()
  for (let i = 0; i < 100; i++) {
    let user = await jsf.resolve(userSchema)
    user = user.userSchema
    await userDB.createUser(user)
  }
}

fillUsersCollection()
