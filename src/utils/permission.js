const ROLES = {
  CUSTOMER: 'customer',
  EMPLOYEE: 'employee'
}

const ACTIONS = {
  LIST: 1,
  GET: 1,
  CREATE: 2,
  UPDATE: 4
}

function checkPermission(functionality, action, permitYourself) {
  return (req, res, next) => {
    if (permitYourself) {
      const idParam = Number(req.params.id)
      const idUser = Number(req.user.id)
      if (idParam === idUser) {
        next()
        return
      }
    }

    const type = req.user.type.toLowerCase()

    if (type === ROLES.CUSTOMER) {
      return res.status(401).json({ message: 'permission denied' })
    }

    const { actions } = req.user.profile.functionalities.find(
      item => item.name.toLowerCase() === functionality
    )
    const hasPermission = (action & actions) === action

    if (!hasPermission) {
      return res.status(401).json({ message: 'permission denied' })
    }

    next()
  }
}

module.exports = {
  ROLES,
  ACTIONS,
  checkPermission
}
