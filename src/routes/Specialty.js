module.exports = app => {
  app.get('/specialties', app.controllers.Specialty.index)
  app.get('/specialties/:id', app.controllers.Specialty.get)
  app.post('/specialties', app.controllers.Specialty.store)
  app.put('/specialties', app.controllers.Specialty.update)
  app.delete('/specialties/:id', app.controllers.Specialty.delete)
}
