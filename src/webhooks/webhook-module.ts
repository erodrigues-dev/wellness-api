import { Express } from 'express'

import midlewares from './midlewares'
import routes from './routes'

export default function useWebhooksModule(app: Express) {
  console.log('>> Loading Webhook module')
  app.use('/webhooks', midlewares)
  app.use('/webhooks', routes)
}
