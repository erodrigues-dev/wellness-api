const { ACTIONS, checkPermission } = require('../../utils/permission')

module.exports = app => {
  app.get('/profiles', checkPermission('profiles', ACTIONS.LIST))
  app.get('/profiles/:id', checkPermission('profiles', ACTIONS.GET))
  app.post('/profiles', checkPermission('profiles', ACTIONS.CREATE))
  app.put('/profiles', checkPermission('profiles', ACTIONS.UPDATE))
}
