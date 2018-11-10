const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.db.URL, config.db.options)

const connection = mongoose.connection

connection.once('open', () => {
  console.log('Mongoose successfully connected')
})

connection.on('error', error => {
  console.error(error)
})

module.exports = connection
