import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())

await connectDB()

app.use('/api/user', userRouter)

app.listen(PORT, ()=> console.log("server running on port " + PORT))
