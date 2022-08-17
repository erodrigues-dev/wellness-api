import { Express } from 'express'
import jwt from 'express-jwt'

import routes from './routes'

export default function useSiteModule(app: Express) {
  console.log('>> Loading Site module')
  app.use(
    '/site',
    jwt({
      secret: process.env.JWT_SECRET,
      algorithms: ['sha1', 'RS256', 'HS256']
    }).unless({
      path: [
        {
          url: /\/site\/sessions\/*/,
          methods: ['POST']
        },
        {
          url: /\/site\/products\/*/,
          methods: ['GET']
        }
      ]
    })
  )

  app.use('/site', routes)
}
