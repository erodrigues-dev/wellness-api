import expressJwt from 'express-jwt'

export const jwtMidleware = expressJwt({
  secret: process.env.JWT_SECRET
}).unless({
  path: ['/sessions']
})
