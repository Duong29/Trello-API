import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'
// Khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null (vì chưa connect)
let trelloDatabaseInstance = null

// Khởi tạo 1 đối tượng mongoClientInstance để connect tới mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // gọi kết nối đến Mongo Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()
  // Kết nối thành công thì lấy database theo tên và gán ngược lại cho biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
// Lấy data
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}