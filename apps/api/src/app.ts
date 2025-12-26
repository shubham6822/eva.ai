import bodyParser from 'body-parser'
import cors from "cors"
import express from 'express'
import { getToken } from './controllers/token.js'

const app: express.Application = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors())
app.get('/', (_, res) => {
  res.json({ message: 'API is running' })
})

app.get("/generate-token", getToken)

export default app
