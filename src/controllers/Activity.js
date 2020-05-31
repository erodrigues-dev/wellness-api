const { Activity, Sequelize } = require('../models')

module.exports = {
  async index(req, res, next) {
    try {
      const { page = 1, limit, name, employeeId } = req.query
      const query = {
        where: {},
        include: {
          association: 'employee',
          attributes: {
            exclude: ['password']
          }
        }
      }
      if (name) {
        query.where.name = { [Sequelize.Op.iLike]: `%${name}%` }
      }
      if (employeeId) {
        query.where.employeeId = employeeId
      }
      if (limit) {
        query.offset = limit * (page - 1)
        query.limit = limit
      }
      const result = await Activity.findAndCountAll(query)
      return res.header('X-Total-Count', result.count).json(result.rows)
    } catch (error) {
      next(error)
    }
  },

  async get(req, res, next) {
    try {
      const { id } = req.params
      const result = await Activity.findByPk(id, {
        include: {
          association: 'employee',
          attributes: {
            exclude: ['password']
          }
        }
      })

      if (!result) {
        return res.status(404).json({ message: 'Activity not found' })
      }

      return res.json(result)
    } catch (error) {
      next(error)
    }
  },

  async store(req, res, next) {
    try {
      const { name, description, price, duration, employeeId } = req.body

      const activity = await Activity.create({
        name,
        description,
        price,
        duration,
        employeeId
      })

      return res.json(activity)
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const { id, name, description, price, duration, employeeId } = req.body

      const activity = await Activity.findByPk(id)

      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' })
      }

      activity.name = name
      activity.description = description
      activity.price = price
      activity.duration = duration
      activity.employeeId = employeeId

      await activity.save()

      return res.json(activity)
    } catch (error) {
      next(error)
    }
  }
}
