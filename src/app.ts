import bodyParser, { BodyParser } from 'body-parser'
import express, { Express } from 'express'
import cors from 'cors'

const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())



export default app