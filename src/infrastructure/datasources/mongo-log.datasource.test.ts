import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'
import mongoose from 'mongoose'

import { envs } from '../../plugins/envs.plugin'
import { LogModel, MongoDB } from '../../data/mongo'
import { MongoLogDatasource } from './mongo-log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

describe('mongo-log-datasource.ts', () => {
  beforeAll(() => {
    MongoDB.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })
  })

  afterAll(async () => {
    mongoose.disconnect()
  })

  beforeEach(async () => {
    await LogModel.deleteMany()
  })

  const log: LogEntity = {
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts',
    level: LogSeverityLevel.medium,
    createdAt: new Date(),
  }
  const logDatasource = new MongoLogDatasource()

  test('should create a log', async () => {
    const logSpy = vi.spyOn(console, 'log')

    await logDatasource.saveLog(log)

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith('Mongo log created', expect.any(String))
  })

  test('should get logs', async () => {
    await logDatasource.saveLog(log)
    const logs = await logDatasource.getLogs(LogSeverityLevel.medium)
    const testLog = logs[0]

    expect(logs.length).toBe(1)
    expect(testLog.message).toBe(log.message)
    expect(testLog.origin).toBe(log.origin)
    expect(testLog.level).toBe(log.level)
  })
})
