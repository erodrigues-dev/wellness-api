module.exports = app => {
  app.get('/profiles', app.controllers.Profile.index)
  app.get('/profiles/:id', app.controllers.Profile.get)
  app.post('/profiles', app.controllers.Profile.store)
  app.put('/profiles', app.controllers.Profile.update)
  // app.delete('/profiles/:id', app.controllers.Profile.destroy)
}
