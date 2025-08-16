/* eslint-disable no-console */
import express from 'express'
import { CONNECT_DB, GET_DB } from './config/mongodb'

const startServer = () => {
  const app = express()
  const hostname = 'localhost'
  const port = 8017
  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.send('<h1>Hello World!</h1><hr>')
  })
  app.listen(port, hostname, () => {
    console.log(`Server is running successfully at Host: ${hostname} and Port:${port}`)
  })
}
console.log('Connecting to MongoDB Cloud Atlas!...')
CONNECT_DB()
  .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
  .then(() => startServer())
  .catch(error => {
    console.log(error)
    process.exit(0)
  })