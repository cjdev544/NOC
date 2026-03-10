import mongoose from 'mongoose'

interface ConnectionOptions {
  mongoUrl: string
  dbName: string
}

export class MongoDB {
  static async connect(options: ConnectionOptions) {
    const { dbName, mongoUrl } = options

    try {
      await mongoose.connect(mongoUrl, { dbName })
      console.log('mongo db connected')
    } catch (error) {
      console.error('MongoDB connection error')
      throw error
    }
  }
}
