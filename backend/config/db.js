var mongoose = require('mongoose')
mongoose.connect('mongodb://backend:dBwBapJj74fWN9RT@194.67.202.99:27017/killerUsers')
//mongoose.connect('mongodb://localhost/killerUsers')
const connection = mongoose.connection
connection.on('error', function () {
    console.log('Connect error')
})
connection.once('open', function () {
    console.log('Mongodb started successfully')
})

module.exports = connection