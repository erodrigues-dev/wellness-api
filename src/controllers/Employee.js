const { hash } = require('../utils/hash-password')
const { Employee, Sequelize } = require('../models')
const { deleteFileFromUrl } = require('../utils/google-cloud-storage')

function buildQuery({ name, email, specialty }) {
  const where = {
    name: { [Sequelize.Op.iLike]: `%${name}%` },
    email: { [Sequelize.Op.iLike]: `%${email}%` },
    specialty: { [Sequelize.Op.iLike]: `%${specialty}%` }
  }

  if (!name) {
    delete where.name
  }

  if (!email) {
    delete where.email
  }

  if (!specialty) {
    delete where.specialty
  }

  return where
}

module.exports = {
  async index(req, res, next) {
    try {
      const { page = 1, limit = 10, profile, ...rest } = req.query
      const where = buildQuery(rest)
      const whereProfile = {}
      if (profile) {
        whereProfile.name = { [Sequelize.Op.iLike]: `%${profile}%` }
      }
      const total = await Employee.count({ where })
      const employees = await Employee.findAll({
        where,
        limit: limit,
        offset: (page - 1) * limit,
        attributes: {
          exclude: ['password', 'profileId']
        },
        include: [
          {
            association: Employee.Profile,
            attributes: ['id', 'name'],
            where: { ...whereProfile }
          }
        ],
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
    const { name, email, password, specialty, profileId } = req.body

    try {
      const hashPwd = await hash(password)
      const employee = await Employee.create({
        name,
        email,
        password: hashPwd,
        specialty,
        profileId,
        imageUrl: req.file && req.file.url
      })

      return res.json(employee)
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    const { id, name, email, password, specialty, profileId } = req.body
    const employee = await Employee.findByPk(id)

    if (!employee) {
      return res.status(404).json({ message: 'employee not found' })
    }

    try {
      employee.name = name
      employee.email = email
      employee.specialty = specialty
      employee.profileId = profileId
      if (password) {
        employee.password = await hash(password)
      }

      if (req.file) {
        if (employee.imageUrl) {
          await deleteFileFromUrl(employee.imageUrl)
        }

        employee.imageUrl = req.file.url
      }
      await employee.save()
      return res.json(employee)
    } catch (error) {
      next(error)
    }
  }
}
