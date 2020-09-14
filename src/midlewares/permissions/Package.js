const { ACTIONS, checkPermission } = require('../../shared/utils/permission')

module.exports = app => {
  app.post('/packages', checkPermission('packages', ACTIONS.CREATE))
  app.put('/packages', checkPermission('packages', ACTIONS.UPDATE))
}
