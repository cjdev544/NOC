import mongoose from 'mongoose'
import { afterAll, describe, expect, test } from 'vitest'
import { MongoDB } from './init'
import { envs } from '../../plugins/envs.plugin'

describe('init.ts', () => {
  afterAll(() => {
    mongoose.connection.close()
  })

  test('should connect to mongo db', async () => {
    const connection = await MongoDB.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })
    expect(connection).toBeTruthy()
  })

  test('should throw an error', async () => {
    const connection = await MongoDB.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: `'${envs.MONGO_URL}gs`,
    })
    expect(connection).toBeFalsy()
  })
})
