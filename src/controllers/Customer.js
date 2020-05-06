const { hash } = require('../utils/hash-password')
const { Customer, Sequelize } = require('../models')

function buildQuery({ name, email }) {
  const where = {
    name: { [Sequelize.Op.iLike]: `%${name}%` },
    email: { [Sequelize.Op.iLike]: `%${email}%` }
  }

  if (!name) {
    delete where.name
  }

  if (!email) {
    delete where.email
  }

  return where
}

module.exports = {
  async index(req, res, next) {
    try {
      const { page = 1, rows = 10 } = req.query
      const where = buildQuery(req.query)

      const total = await Customer.count({ where })
      const customers = await Customer.findAll({
        where,
        limit: rows,
        offset: (page - 1) * rows,
        attributes: { exclude: ['password'] },
        order: ['name']
      })

      return res.header('X-Total-Count', total).json(customers)
    } catch (err) {
      next(err)
    }
  },

  async get(req, res) {
    const { id } = req.params
    const customer = await Customer.findByPk(id, {
      attributes: { exclude: ['password'] }
    })

    if (!customer) return res.status(404).json({ message: 'customer not found' })

    return res.json(customer)
  },

  async store(req, res, next) {
    const { name, email, password } = req.body

    try {
      const hashPwd = await hash(password)
      const customer = await Customer.create({
        name,
        email,
        password: hashPwd
      })

      return res.json(customer)
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    const { id, name, email, password } = req.body
    const customer = await Customer.findByPk(id)

    if (!customer) return res.status(404).json({ message: 'customer not found' })

    try {
      customer.name = name
      customer.email = email
      if (password) customer.password = await hash(password)
      await customer.save()
      return res.json(customer)
    } catch (error) {
      next(error)
    }
  },

  async destroy(req, res, next) {
    try {
      const deleted = await Customer.destroy({
        where: {
          id: req.params.id
        }
      })
      if (deleted) return res.status(204).json()
      return res.status(400).json({ error: 'Customer not found' })
    } catch (error) {
      next(error)
    }
  }
}
