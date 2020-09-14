const { ACTIONS, checkPermission } = require('../../shared/utils/permission')

module.exports = app => {
  app.get('/customers', checkPermission('customers', ACTIONS.LIST))
  app.get('/customers/:id', checkPermission('customers', ACTIONS.GET, true))
  app.put('/customers', checkPermission('customers', ACTIONS.UPDATE))
}
