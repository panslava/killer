const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`)
})

const userRoutes = require('./routes/users.js')
const adminRoutes = require('./routes/admin.js')

app.use('/users', userRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req, res) => {
  res.send('Simple backend response').status(200)
})
