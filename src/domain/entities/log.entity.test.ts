import { describe, expect, test } from 'vitest'
import { LogEntity, LogSeverityLevel } from './log.entity'

describe('log.entity.ts', () => {
  const dataObj = {
    message: 'test message',
    origin: 'log.entity.test.ts',
    level: LogSeverityLevel.high,
    createdAt: new Date(),
  }

  test('should create a LogEntity instance', () => {
    const log = new LogEntity(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.level).toBe(dataObj.level)
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('should create instance from json', () => {
    const json = `{"message":"https://google.com is working","level":"low","createdAt":"2026-03-11T07:37:15.730Z","origin":"check-service.ts"}`

    const log = LogEntity.fromJson(json)
    console.log(log)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe('https://google.com is working')
    expect(log.origin).toBe('check-service.ts')
    expect(log.level).toBe(LogSeverityLevel.low)
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('should return a log in fromObject function', () => {
    const log = LogEntity.fromObject(dataObj)

    expect(log.message).toBe(dataObj.message)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.level).toBe(dataObj.level)
    expect(log.createdAt).toBeInstanceOf(Date)
  })
})
