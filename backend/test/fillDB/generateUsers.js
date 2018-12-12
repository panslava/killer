const jsf = require('json-schema-faker')
const userDB = require('../../src/controllers/db/user')
const userSchema = require('./fakerSchemas/fakerUser')

jsf.extend('faker', () => {
  // just ignore the passed faker instance
  const faker = require('faker/locale/en')
  // do other stuff
  return faker
})

module.exports = async function (count) {
  try {
    await userDB.dropCollection()
  }
  catch (err) {
    console.log(err)
  }
  for (let i = 0; i < count; i++) {
    let user = await jsf.resolve(userSchema)
    await userDB.create(user)
  }
}
