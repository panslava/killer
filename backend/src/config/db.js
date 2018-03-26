var mongoose = require('mongoose')
var connectionString = require('../instantiated/mongoConfig.js')
mongoose.connect(connectionString)
//mongoose.connect('mongodb://localhost/killerUsers')
const connection = mongoose.connection
connection.on('error', function () {
    console.log('Connect error')
})
connection.once('open', function () {
    console.log('Mongodb started successfully')
})

module.exports = connection
