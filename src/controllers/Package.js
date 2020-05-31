const { Package, sequelize, Sequelize } = require('../models')

const serialize = obj => ({
  ...obj,
  price: parseFloat(obj.price),
  activities: obj.activities.map(({ PackageActivity, ...item }) => ({
    ...item,
    price: parseFloat(item.price),
    quantity: PackageActivity.quantity
  }))
})

module.exports = {
  async index(req, res, next) {
    try {
      const { name = '', activityName = '', page = 1, limit } = req.query
      const list = await Package.findAndCountAll({
        limit: limit || undefined,
        offset: limit ? (page - 1) * limit : undefined,
        where: {
          name: { [Sequelize.Op.iLike]: `%${name}%` }
        },
        distinct: true,
        include: [
          {
            association: 'activities',
            through: {
              attributes: ['quantity']
            },
            where: {
              name: { [Sequelize.Op.iLike]: `%${activityName}%` }
            }
          }
        ]
      })

      const records = list.rows.map(row => row.toJSON()).map(serialize)

      return res.header('X-Total-Count', list.count).json(records)
    } catch (error) {
      next(error)
    }
  },

  async get(req, res, next) {
    try {
      const { id } = req.params

      const obj = await Package.findByPk(id, {
        include: {
          association: 'activities'
        }
      })

      if (!obj) {
        return res.status(404).json({ message: 'package not found' })
      }

      const storedPackage = serialize(obj.toJSON())

      return res.json(storedPackage)
    } catch (error) {
      next(error)
    }
  },

  async store(req, res, next) {
    const transaction = await sequelize.transaction()
    try {
      const { name, price, description, activities } = req.body
      const storePackage = await Package.create(
        {
          name,
          price,
          description
        },
        { transaction }
      )
      await Promise.all(
        activities.map(item =>
          storePackage.addActivity(item.id, {
            through: { quantity: item.quantity },
            transaction
          })
        )
      )
      await storePackage.reload({
        include: {
          association: 'activities',
          through: { attributes: ['quantity'] }
        },
        transaction
      })
      await transaction.commit()
      const serialized = serialize(storePackage)
      return res.json(serialized)
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  },

  async update(req, res, next) {
    const transaction = await sequelize.transaction()
    try {
      const { id, name, price, description, activities } = req.body
      const storePackage = await Package.findByPk(id)
      if (!storePackage) {
        return res.status(404).json({ message: 'package not found' })
      }

      storePackage.name = name
      storePackage.price = price
      storePackage.description = description

      await storePackage.save({ transaction })
      await storePackage.setActivities([], { transaction })

      await Promise.all(
        activities.map(item =>
          storePackage.addActivity(item.id, {
            through: { quantity: item.quantity },
            transaction
          })
        )
      )

      await transaction.commit()
      return res.json()
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params
      const result = await Package.destroy({ where: { id } })

      if (result === 0) {
        return res.status(404).json({ message: 'package not found' })
      }

      return res.json()
    } catch (error) {
      next(error)
    }
  }
}
