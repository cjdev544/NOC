import { beforeEach, describe, expect, test, vi } from 'vitest'
import { CheckService } from './check-service'
import { LogEntity } from '../../entities/log.entity'

describe('check-service.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockRepository = {
    saveLog: vi.fn(),
    getLogs: vi.fn(),
  }

  const mockSuccessCallback = vi.fn()
  const mockErrorCallback = vi.fn()

  const checkService = new CheckService(
    mockRepository,
    mockSuccessCallback,
    mockErrorCallback,
  )

  test('should call successCallback when fetch returns true', async () => {
    const wasOk = await checkService.execute('https://google.com')

    expect(wasOk).toBeTruthy()
    expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
    expect(mockSuccessCallback).toHaveBeenCalled()
    expect(mockErrorCallback).not.toHaveBeenCalled()
  })

  test('should call errorCallback when fetch returns false', async () => {
    const wasOk = await checkService.execute(
      'https://fakedomain245342fg3gvh.com',
    )

    expect(wasOk).toBeFalsy()
    expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
    expect(mockSuccessCallback).not.toHaveBeenCalled()
    expect(mockErrorCallback).toHaveBeenCalled()
  })
})
