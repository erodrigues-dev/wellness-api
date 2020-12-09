import { Express } from 'express';
import expressJwt from 'express-jwt';

import midlewares from './midlewares';
import routes from './routes';

export default function useAdminModule(app: Express) {
  app.use(
    '/admin',
    expressJwt({ secret: process.env.JWT_SECRET }).unless({
      path: [
        {
          url: '/admin/sessions',
          methods: ['POST']
        }
      ]
    })
  );

  app.use('/admin', midlewares);
  app.use('/admin', routes);
}
