/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'

const DATABASE_URL = process.env.MONGODB_URL!

if (!DATABASE_URL) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env.local')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectToDb() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(DATABASE_URL, opts).then(mongoose => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
