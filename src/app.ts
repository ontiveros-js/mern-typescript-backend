import express from 'express'
const app = express()
import cors from 'cors'
import vidrut from './routes/videos.route'

app.use(express.json())
app.use(cors({origin: process.env.WHITE_LIST}))
app.use(express.urlencoded({extended: false}))

app.use(vidrut)

export default app