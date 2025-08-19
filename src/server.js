/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from './config/mongodb'

const startServer = () => {
  const app = express()
  const hostname = 'localhost'
  const port = 8017
  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.send('<h1>Hello World!</h1><hr>')
  })
  app.listen(port, hostname, () => {
    console.log(`3.Server is running successfully at Host: ${hostname} and Port:${port}`)
  })
  // Thực hiện các tác vụ cleanup trước khi dừng Server
  exitHook(() => {
    console.log('4.Disconnecting from MongoDB Cloud Atlas...')
    CLOSE_DB()
    console.log('5.Disconnected from MongoDB Cloud Atlas')
  })
}
console.log('1.Connecting to MongoDB Cloud Atlas!...')
CONNECT_DB()
  .then(() => console.log('2.Connected to MongoDB Cloud Atlas!'))
  .then(() => startServer())
  .catch(error => {
    console.log(error)
    process.exit(0)
  })