import app from './src/app.js'
import connectDB from './src/db/db.js'
import dotenv from 'dotenv/config'

async function startServer() {
    const port = process.env.PORT || 3000
    try {
        connectDB()
        app.listen(port, () => {
            console.log("Server started on port 3000")
        })

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

startServer()