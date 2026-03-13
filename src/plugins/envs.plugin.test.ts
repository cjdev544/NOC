import { describe, expect, test } from 'vitest'
import { envs } from './envs.plugin'

describe('envs.plugin.ts', () => {
  test('Should have all the environment variables', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'cjdev544@gmail.com',
      MAILER_SECRET_KEY: 'hrhndskbgqtjlswh',
      MONGO_URL: 'mongodb://cjdev544:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'cjdev544',
      MONGO_PASS: '123456',
      DATABASE_URL: 'postgresql://postgres:123456@localhost:5432/NOC',
      POSTGRES_DB: 'NOC-TEST',
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: '123456',
    })
  })
})
