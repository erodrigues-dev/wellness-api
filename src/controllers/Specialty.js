const { Specialty } = require('../models')

module.exports = {
  async index(req, res) {
    const specialties = await Specialty.findAll()
    return res.json(specialties)
  },

  async store(req, res) {
    const { name } = req.body

    const specialty = await Specialty.create({
      name
    })

    return res.json(specialty)
  },

  async get(req, res) {
    const { id } = req.params
    const customer = await Specialty.findByPk(id)

    if (!customer) return res.status(404).json({ message: 'customer not found' })

    return res.json(customer)
  },

  async delete(req, res) {
    const deleted = await Specialty.destroy({
      where: {
        id: req.params.id
      }
    })
    if (deleted) return res.status(204).json()
    return res.status(400).json({ error: 'Specialty not found' })
  },

  async update(req, res) {}
}
