import { Express } from 'express';

import midlewares from './midlewares';
import routes from './routes';

export default function useAdminModule(app: Express) {
  app.use('/admin', midlewares);
  app.use('/admin', routes);
}
