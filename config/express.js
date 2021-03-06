// config/express.js

const config          = require('./config')
const express         = require('express')
const morgan          = require('morgan') // HTTP request logger
const compress        = require('compress')
const bodyParser      = require('body-parser')
const methodOverride  = require('method-override')
const session         = require('express-session')
const passport        = require('passport')

module.exports = () => {
  const app = express()

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress())
  }

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(methodOverride())

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }))

  app.set('views', './app/views')
  app.set('view engine', 'ejs')

  app.use(passport.initialize())
  app.use(passport.session())

  require('../app/routes/index.server.routes.js')(app)
  require('../app/routes/users.server.routes.js')(app)

  app.use(express.static('./public'))

  return app
}
