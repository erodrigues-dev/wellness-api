import { Router } from 'express';

import TeamGroup from '../../shared/database/models/TeamGroup';

const router = Router();

router.get('/team-groups', async (req, res) => {
  const all = await TeamGroup.findAll({
    include: 'members'
  });

  return res.json(all);
});

router.post('/team-groups', async (req, res) => {
  const created = await TeamGroup.create({
    name: req.body.name
  });

  return res.json(created);
});

router.post('/team-groups/:id/members', async (req, res) => {
  const { id } = req.params;
  const { members } = req.body;
  const model = await TeamGroup.findByPk(id);
  await model.setMembers(members);

  return res.sendStatus(200);
});

export default router;
