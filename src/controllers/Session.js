const jwt = require('jsonwebtoken')
const { Customer, Employee } = require('../models')
const hashPassword = require('../utils/hash-password')

module.exports = {
  async create(req, res) {
    const { email, password } = req.body
    let type = 'customer'
    let user = await Customer.findOne({ where: { email } })

    if (!user) {
      type = 'employee'
      user = await Employee.findOne({
        where: { email },
        include: [
          {
            association: Employee.Profile,
            include: 'functionalities'
          }
        ]
      })
    }

    if (!user) {
      return res.status(401).json()
    }

    const match = await hashPassword.compare(password, user.password)

    if (!match) {
      return res.status(401).json()
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      type
    }

    if (user.profile) {
      const { id, name, functionalities: list } = user.profile
      const functionalities = list.map(item => ({
        name: item.name,
        actions: item.actions
      }))

      payload.profile = {
        id,
        name,
        functionalities
      }
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '12h'
    })

    return res.json({ token })
  }
}
