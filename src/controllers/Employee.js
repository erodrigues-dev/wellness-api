const { hash } = require('../utils/hash-password')
const { Employee, Sequelize } = require('../models')

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
      const total = await Employee.count({ where })
      const employees = await Employee.findAll({
        where,
        limit: rows,
        offset: (page - 1) * rows,
        attributes: { exclude: ['password'] },
        order: ['name']
      })

      return res.header('X-Total-Count', total).json(employees)
    } catch (err) {
      next(err)
    }
  },

  async get(req, res) {
    const { id } = req.params
    const employee = await Employee.findByPk(id, {
      attributes: { exclude: ['password'] }
    })

    if (!employee) {
      return res.status(404).json({ message: 'employee not found' })
    }

    return res.json(employee)
  },

  async store(req, res, next) {
    const { name, email, password } = req.body

    try {
      const hashPwd = await hash(password)
      const employee = await Employee.create({
        name,
        email,
        password: hashPwd
      })

      return res.json(employee)
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    const { id, name, email, password } = req.body
    const employee = await Employee.findByPk(id)

    if (!employee) {
      return res.status(404).json({ message: 'employee not found' })
    }

    try {
      employee.name = name
      employee.email = email
      if (password) employee.password = await hash(password)
      await employee.save()
      return res.json(employee)
    } catch (error) {
      next(error)
    }
  }
}
