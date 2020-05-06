module.exports = app => {
  app.get('/employees', app.controllers.Employee.index)
  app.get('/employees/:id', app.controllers.Employee.get)
  app.post('/employees', app.controllers.Employee.store)
  app.put('/employees', app.controllers.Employee.update)
}
