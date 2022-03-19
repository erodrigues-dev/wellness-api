import { Express } from 'express'

import axiosErrorHandler from './AxiosErrorHandler'
import customErrorHandler from './CustomErrorHandler'
import jsonErrorHandler from './JsonErrorHandler'
import uploadErrorHandler from './UploadErrorHandler'
import validatorErrorHandler from './ValidatorErrorHandler'
import jwtErrorHandler from './JwtErrorHandler'
import logErrorHandler from './LogErrorHandler'

export default function useErrorHandlers(app: Express) {
  console.log('>> Loading Error Handlers')
  app.use(logErrorHandler)
  app.use(jwtErrorHandler)
  app.use(validatorErrorHandler)
  app.use(uploadErrorHandler)
  app.use(customErrorHandler)
  app.use(axiosErrorHandler)
  app.use(jsonErrorHandler)
}
