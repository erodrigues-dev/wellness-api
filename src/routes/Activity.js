module.exports = app => {
  app.get('/activities', app.controllers.Activity.index)
  app.get('/activities/:id', app.controllers.Activity.get)
  app.post('/activities', app.controllers.Activity.store)
  app.put('/activities', app.controllers.Activity.update)
}
