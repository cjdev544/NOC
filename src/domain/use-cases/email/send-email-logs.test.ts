import { beforeEach, describe, expect, test, vi } from 'vitest'
import { SendEmailLogs } from './send-email-logs'
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'

describe('send-email-logs.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockEmailService = {
    sendEmailWithFileSystemLogs: vi.fn().mockReturnValue(true),
  }
  const mockLogRepository = {
    saveLog: vi.fn(),
    getLogs: vi.fn(),
  }

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository,
  )

  test('should call sendEmail and saveLog', async () => {
    const result = await sendEmailLogs.execute('cjdev544@gmail.com')

    expect(result).toBeTruthy()
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled()
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    )
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      level: LogSeverityLevel.low,
      message: 'Email send',
      origin: 'send-email-logs',
      createdAt: expect.any(Date),
    })
  })

  test('should log in case of error', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false)
    const result = await sendEmailLogs.execute('cjdev544@gmail.com')

    expect(result).toBeFalsy()
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled()
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    )
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      level: LogSeverityLevel.high,
      message: 'Error: Email not send',
      origin: 'send-email-logs',
      createdAt: expect.any(Date),
    })
  })
})
