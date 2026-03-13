import { describe, expect, test } from 'vitest'
import { LogDatasource } from './log.datasource'
import { LogEntity, LogSeverityLevel } from '../entities/log.entity'

describe('log.datasource.ts', () => {
  class MockLogDatasource extends LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return []
    }
  }

  test('should implement LogDatasource contract', async () => {
    const logDatasource = new MockLogDatasource()

    expect(logDatasource.saveLog).toBeTypeOf('function')
    expect(logDatasource.getLogs).toBeTypeOf('function')
    expect(logDatasource).toHaveProperty('saveLog')
  })
})
