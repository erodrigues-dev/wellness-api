import expressJwt from 'express-jwt';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import { databaseConfig } from './shared/database/connection';
import useErrorHandlers from './shared/error-handlers';
import useAdminModule from './admin/admin-module';

databaseConfig();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));

app.use(
  expressJwt({
    secret: process.env.JWT_SECRET
  }).unless({
    path: ['/admin/sessions']
  })
);

useAdminModule(app);
//useSiteModule(app)
//useAppEmployeeModule(app)
//useAppCustomerModule(app)

useErrorHandlers(app);

export default app;
