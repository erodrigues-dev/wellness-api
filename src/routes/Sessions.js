module.exports = app => {
  app.post('/sessions', app.controllers.Session.create)
}
