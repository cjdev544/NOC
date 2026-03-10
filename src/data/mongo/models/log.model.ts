import { model, Schema } from 'mongoose'

const logSchema = new Schema({
  message: {
    type: String,
    require: true,
  },
  origin: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    require: true,
    default: 'low',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

export const LogModel = model('log', logSchema)
