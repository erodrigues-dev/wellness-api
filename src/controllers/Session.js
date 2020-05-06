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
      user = await Employee.findOne({ where: { email } })
    }

    if (!user) {
      return res.status(401).json()
    }

    const match = await hashPassword.compare(password, user.password)

    if (!match) {
      return res.status(401).json()
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        type
      },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    )

    return res.json({ token })
  }
}
