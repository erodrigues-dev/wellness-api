import { Express } from 'express';

import uploadErrorHandler from './UploadErrorHandler';
import customErrorHandler from './CustomErrorHandler';
import jsonErrorHandler from './JsonErrorHandler';

export default function useErrorHandlers(app: Express) {
  app.use(uploadErrorHandler);
  app.use(customErrorHandler);

  app.use(jsonErrorHandler);
}
