module.exports = app => {
  app.get('/activities', app.controllers.Activity.index)
  app.post('/activities', app.controllers.Activity.store)
  app.put('/activities', app.controllers.Activity.update)
  app.delete('/activities/:id', app.controllers.Activity.delete)
}
