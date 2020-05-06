module.exports = app => {
  app.get('/customers', app.controllers.Customer.index)
  app.get('/customers/:id', app.controllers.Customer.get)
  app.post('/customers', app.controllers.Customer.store)
  app.put('/customers', app.controllers.Customer.update)
  app.delete('/customers/:id', app.controllers.Customer.destroy)
}
