var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
var users = require('./routes/users.js')
var admin = require('./routes/admin.js')

app.listen(8080)
console.log('Listening on port 8080')

app.use('/users', users)
app.use('/admin', admin)

app.get('/', (req, res) => {
    res.send('Backend test')
})
