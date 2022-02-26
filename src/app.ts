import '../dotenv-config'
import 'express-async-errors'

import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import path from 'path'

import YAML from 'yamljs'

import useAdminModule from './admin/admin-module'
import { databaseConfig } from './shared/database/connection'
import useErrorHandlers from './shared/error-handlers'
import useSiteModule from './site/site-module'
import useWebhooksModule from './webhooks/webhook-module'

const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'admin-swagger.yml'))

databaseConfig()

const app = express()

app.use(
  cors({
    exposedHeaders: ['X-Total-Count']
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('short'))

app.get('/', (_, res) => {
  return res.json({
    type: 'health-check',
    message: 'api is running'
  })
})

app.use('/admin/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

useAdminModule(app)
useWebhooksModule(app)
useSiteModule(app)

useErrorHandlers(app)

export default app
