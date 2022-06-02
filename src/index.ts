import dotenv from 'dotenv'
dotenv.config()
import app from './app'
import './db'


app.listen(process.env.PORT, () => {
    console.log("server on port", process.env.PORT)
})