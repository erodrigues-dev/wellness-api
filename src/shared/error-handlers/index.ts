import { Express } from 'express';

import axiosErrorHandler from './AxiosErrorHandler';
import customErrorHandler from './CustomErrorHandler';
import jsonErrorHandler from './JsonErrorHandler';
import uploadErrorHandler from './UploadErrorHandler';

export default function useErrorHandlers(app: Express) {
  app.use(uploadErrorHandler);
  app.use(customErrorHandler);
  app.use(axiosErrorHandler);
  app.use(jsonErrorHandler);
}
