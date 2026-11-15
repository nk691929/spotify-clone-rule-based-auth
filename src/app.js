import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from '../src/routes/auth.routes.js'

const app = express()
app.use(cors())
app.use(json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)

export default app