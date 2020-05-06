module.exports = app => {
  app.get('/users', app.controllers.User.index)
  app.get('/users/:id', app.controllers.User.get)
  app.post('/users', app.controllers.User.store)
  app.put('/users', app.controllers.User.update)
}
