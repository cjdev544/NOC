import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { MongoDB } from '../init'
import { envs } from '../../../plugins/envs.plugin'
import { LogModel } from './log.model'
import {
  LogEntity,
  LogSeverityLevel,
} from '../../../domain/entities/log.entity'

describe('log.model.ts', () => {
  beforeAll(() => {
    MongoDB.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test('should return LogModel', async () => {
    const logData: LogEntity = {
      origin: 'log.model.test.ts',
      message: 'test message',
      level: LogSeverityLevel.low,
      createdAt: new Date(),
    }

    const log = await LogModel.create(logData)

    expect(log).toEqual(
      expect.objectContaining({
        ...log,
        createdAt: expect.any(Date),
        id: expect.any(String),
      }),
    )

    await LogModel.findByIdAndDelete(log.id)
  })

  test('should return the schema object', () => {
    const schema = LogModel.schema.obj

    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), require: true },
        origin: { type: expect.any(Function), require: true },
        level: {
          type: expect.any(Function),
          enum: ['low', 'medium', 'high'],
          require: true,
          default: 'low',
        },
        createdAt: expect.any(Object),
      }),
    )
  })
})
