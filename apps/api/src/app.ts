import express from 'express'

const app : express.Application = express()

app.use(express.json())

app.get('/', (_, res) => {
  res.send('EVA Backend Running')
})

export default app
