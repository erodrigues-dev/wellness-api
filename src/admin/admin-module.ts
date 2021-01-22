import { Express } from 'express';
import jwt from 'express-jwt';

import midlewares from './midlewares';
import routes from './routes';

export default function useAdminModule(app: Express) {
  app.use(
    '/admin',
    jwt({
      secret: process.env.JWT_SECRET,
      algorithms: ['sha1', 'RS256', 'HS256']
    }).unless({
      path: [
        {
          url: '/admin/sessions',
          methods: ['POST']
        },
        {
          url: '/admin/sessions/recover-password',
          methods: ['POST']
        }
      ]
    })
  );

  app.use('/admin', midlewares);
  app.use('/admin', routes);
}
