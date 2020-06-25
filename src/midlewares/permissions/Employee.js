const { ACTIONS, checkPermission } = require('../../utils/permission')

module.exports = app => {
  app.get('/employees', checkPermission('employees', ACTIONS.LIST))
  app.get('/employees/:id', checkPermission('employees', ACTIONS.GET, true))
  app.post('/employees', checkPermission('employees', ACTIONS.CREATE))
  app.put('/employees', checkPermission('employees', ACTIONS.UPDATE))
}
