import 'dotenv/config';
import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import useAdminModule from './admin/admin-module';
import { databaseConfig } from './shared/database/connection';
import useErrorHandlers from './shared/error-handlers';
import useWebhooksModule from './webhooks/webhook-module';

databaseConfig();

const app = express();

app.use(
  cors({
    exposedHeaders: ['X-Total-Count']
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));

app.use('/api', (_, res) => {
  return res.json({
    type: 'health-check',
    message: 'api is running'
  });
});

useAdminModule(app);
useWebhooksModule(app);
//useSiteModule(app)
//useAppEmployeeModule(app)
//useAppCustomerModule(app)

useErrorHandlers(app);

export default app;
