// app/routes/index.server.routes.js

module.exports = (app) => {
  const index = require('../controllers/index.server.controller')
  app.get('/', index.render)
}
