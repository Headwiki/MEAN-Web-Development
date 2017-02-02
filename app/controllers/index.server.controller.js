// app/controllers/index.server.controller.js

exports.render = (req, res) => {
  res.render('index', {
    title: 'Hello World'
  })
}
