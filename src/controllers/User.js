const { hash } = require('../utils/hash-password')
const { User, Sequelize } = require('../models')

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
      // TODO usar findAndCounterAll
      // reference: https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAndCountAll
      const total = await User.count({ where })
      const users = await User.findAll({
        where,
        limit: rows,
        offset: (page - 1) * rows,
        attributes: { exclude: ['password'] },
        order: ['name']
      })

      return res.header('X-Total-Count', total).json(users)
    } catch (err) {
      next(err)
    }
  },

  async get(req, res) {
    const { id } = req.params
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    })

    if (!user) return res.status(404).json({ message: 'user not found' })

    return res.json(user)
  },

  async store(req, res, next) {
    const { name, email, password } = req.body

    try {
      const hashPwd = await hash(password)
      const user = await User.create({
        name,
        email,
        password: hashPwd
      })

      return res.json(user)
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    const { id, name, email, password } = req.body
    const user = await User.findByPk(id)

    if (!user) return res.status(404).json({ message: 'user not found' })

    try {
      user.name = name
      user.email = email
      if (password) user.password = await hash(password)
      await user.save()
      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
}
