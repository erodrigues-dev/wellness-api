const { Activity } = require('../models')

module.exports = {
  async index(req, res) {
    const activities = await Activity.findAll()
    return res.json(activities)
  },

  async store(req, res) {
    const { name, description, price, duration } = req.body

    const activity = await Activity.create({
      name,
      description,
      price,
      duration
    })

    return res.json(activity)
  },

  async delete(req, res) {
    const deleted = await Activity.destroy({
      where: {
        id: req.params.id
      }
    })
    if (deleted) return res.status(204).json()
    return res.status(400).json({ error: 'Activity not found' })
  },

  async update(req, res) {}
}
