var mongoose = require('mongoose')
mongoose.connect('mongodb://backend:dBwBapJj74fWN9RT@194.67.202.99:27017/killerUsers')
const db = mongoose.connection
db.on('error', function () {
    console.log('Connect error')
})
db.once('open', function () {
    console.log('Mongodb started successfully')
})