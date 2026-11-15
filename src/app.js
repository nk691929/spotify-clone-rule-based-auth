import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from '../src/routes/auth.routes.js'
import musicRoutes from '../src/routes/music.routes.js'

const app = express()
app.use(cors())
app.use(json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/music", musicRoutes)

export default app