module.exports = {
  port: process.env.PORT || 8081,

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_POST || '27017',
    user: process.env.DB_USER || 'killer',
    password: process.env.DB_PASS || 'killerPass',
    database: process.env.DB_NAME || 'killer',
    options: {
      useNewUrlParser: true
    }
  },

  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    adminPass: process.env.ADMIN_PASS || 'adminPass'
  }
}
