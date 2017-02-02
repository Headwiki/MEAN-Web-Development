// app/config/express.js

const express = require('express')

module.exports = () => {
  const app = express()
  require('../app/routes/index.server.routes.js')(app)
  return app
}
