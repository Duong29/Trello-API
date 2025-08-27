/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()
  app.use('/v1', APIs_V1)
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3.Hi ${env.AUTHOR}. Server is running successfully at Host: ${env.APP_HOST} and Port:${env.APP_PORT}`)
  })
  // Thực hiện các tác vụ cleanup trước khi dừng Server
  exitHook(() => {
    console.log('4.Server is shutting down')
    CLOSE_DB()
    console.log('5.Disconnected from MongoDB Cloud Atlas')
  })
}
console.log('1.Connecting to MongoDB Cloud Atlas!...')
CONNECT_DB()
  .then(() => console.log('2.Connected to MongoDB Cloud Atlas!'))
  .then(() => START_SERVER())
  .catch(error => {
    console.log(error)
    process.exit(0)
  })