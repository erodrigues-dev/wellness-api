import { Express } from 'express';

import midlewares from './midlewares';
import routes from './routes';

export default function useWebhooksModule(app: Express) {
  app.use('/webhooks', midlewares);
  app.use('/webhooks', routes);
}
