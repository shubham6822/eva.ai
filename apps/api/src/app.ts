import bodyParser from 'body-parser'
import cors from "cors"
import dotenv from 'dotenv'
import express from 'express'

const app: express.Application = express()

dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors())
app.get('/', (_, res) => {
  res.json({ message: 'API is running' })
})

export default app
