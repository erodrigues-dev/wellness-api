const { ACTIONS, checkPermission } = require('../../utils/permission')

module.exports = app => {
  app.post('/activities', checkPermission('activities', ACTIONS.CREATE))
  app.put('/activities', checkPermission('activities', ACTIONS.UPDATE))
}
