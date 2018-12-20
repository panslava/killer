const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/index')
const expressWinston = require('./config/winston')

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(cors())

app.use(morgan('dev'))
app.use(expressWinston.logger)

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`)
})

const userRoutes = require('./routes/users.js')
const adminRoutes = require('./routes/admin.js')

app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
    res.send('Simple backend response').status(200)
})

app.use(expressWinston.errorLogger)
