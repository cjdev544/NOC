import { describe, expect, test } from 'vitest'
import { LogRepository } from './log.repository'
import { LogEntity, LogSeverityLevel } from '../entities/log.entity'

describe('log.repository.ts', () => {
  class TestLogRepository extends LogRepository {
    async saveLog(log: LogEntity): Promise<void> {
      return
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return []
    }
  }

  test('should implement LogDatasource contract', async () => {
    const logDatasource = new TestLogRepository()

    expect(logDatasource.saveLog).toBeTypeOf('function')
    expect(logDatasource.getLogs).toBeTypeOf('function')
    expect(logDatasource).toHaveProperty('saveLog')
    expect(logDatasource).toHaveProperty('getLogs')
  })
})
