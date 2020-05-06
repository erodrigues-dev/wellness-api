const expressJwt = require('express-jwt')

module.exports = app => {
  app.use(
    expressJwt({ secret: process.env.JWT_SECRET }).unless({
      path: ['/sessions', { url: '/customers', methods: ['POST'] }]
    })
  )
}
