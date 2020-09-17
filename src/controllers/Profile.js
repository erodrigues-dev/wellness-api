const {
  Profile,
  Functionality,
  sequelize,
  Sequelize
} = require('../shared/database/models');

module.exports = {
  async index(req, res, next) {
    const { name, description, page = 1, limit } = req.query;

    try {
      const query = { where: {} };
      if (name) {
        query.where.name = { [Sequelize.Op.iLike]: `%${name}%` };
      }
      if (description) {
        query.where.description = { [Sequelize.Op.iLike]: `%${description}%` };
      }

      if (limit) {
        query.limit = limit;
        query.offset = limit * (page - 1);
      }

      const result = await Profile.findAndCountAll(query);

      return res.header('X-Total-Count', result.count).json(result.rows);
    } catch (error) {
      next(error);
    }
  },

  async get(req, res) {
    const { id } = req.params;
    const model = await Profile.findByPk(id, { include: 'functionalities' });

    if (!model) return res.status(404).json({ message: 'profile not found' });

    return res.json(model);
  },

  async store(req, res, next) {
    const { name, description, functionalities } = req.body;

    try {
      const model = await Profile.create(
        {
          name,
          description,
          functionalities
        },
        {
          include: [Profile.Functionalities]
        }
      );
      return res.json(model);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const { id, name, description, functionalities } = req.body;
    const model = await Profile.findByPk(id, {
      include: [Profile.Functionalities]
    });

    if (!model) return res.status(404).json({ message: 'profile not found' });

    const transaction = await sequelize.transaction();

    try {
      model.name = name;
      model.description = description;

      if (functionalities) {
        // remove todas as funcionalidades
        await Functionality.destroy({
          where: { profile_id: model.id },
          transaction
        });
        // insere todas as funcionalidades
        const inserts = functionalities.map(functionality => {
          const { name, actions } = functionality;
          return Functionality.create(
            { name, actions, profileId: model.id },
            { transaction }
          );
        });
        await Promise.all(inserts);
      }

      await model.save();
      await transaction.commit();

      return res.status(204).json();
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const deleted = await Profile.destroy({
        where: {
          id: req.params.id
        }
      });
      if (deleted) return res.status(204).json();
      return res.status(400).json({ error: 'Profile not found' });
    } catch (error) {
      next(error);
    }
  }
};
