import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'

import { databaseConfig } from './shared/database/connection'
import { jwtMidleware } from './midlewares/jwt'
import sessionRouter from './routes/Session'

databaseConfig()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('short'))

// app midlewares
app.use(jwtMidleware)
//TODO
//- permissions
//- uploads
//- validates
//- controllers
//- routes
app.use(sessionRouter)
//- db-error
//- error-as-json

export default app
