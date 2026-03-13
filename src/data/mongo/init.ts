import mongoose from 'mongoose'

interface ConnectionOptions {
  mongoUrl: string
  dbName: string
}

export class MongoDB {
  static async connect(options: ConnectionOptions): Promise<boolean> {
    const { dbName, mongoUrl } = options

    try {
      await mongoose.connect(mongoUrl, { dbName })
      return true
    } catch (error) {
      return false
    }
  }
}
