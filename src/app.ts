import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import { databaseConfig } from './shared/database/connection';
import midlewares from './midlewares';
import routes from './routes';
import useErrorHandlers from './midlewares/error-handlers';

databaseConfig();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));

app.use(midlewares);
app.use(routes);

useErrorHandlers(app);

export default app;
