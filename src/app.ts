import bodyParser, { BodyParser } from 'body-parser'
import express, { Express } from 'express'
import cors from 'cors'
import notesRouter from './routes/notes.routes.js'

const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/notes', notesRouter)

export default app