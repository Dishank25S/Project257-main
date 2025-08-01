import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI || ''
const dbName = process.env.MONGODB_DB || 'project257'

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local')
}

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri)
  const db = client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
