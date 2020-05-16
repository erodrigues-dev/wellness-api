module.exports = app => {
  app.get('/packages', app.controllers.Package.index)
  app.get('/packages/:id', app.controllers.Package.get)
  app.delete('/packages/:id', app.controllers.Package.destroy)
  app.post('/packages', app.controllers.Package.store)
  app.put('/packages', app.controllers.Package.update)
}
