import { beforeEach, describe, expect, test, vi } from 'vitest'
import { LogEntity } from '../../entities/log.entity'
import { CheckServiceMultiple } from './check-service-multiple'

describe('check-service-multiple.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockRepository1 = {
    saveLog: vi.fn(),
    getLogs: vi.fn(),
  }
  const mockRepository2 = {
    saveLog: vi.fn(),
    getLogs: vi.fn(),
  }
  const mockRepository3 = {
    saveLog: vi.fn(),
    getLogs: vi.fn(),
  }

  const mockSuccessCallback = vi.fn()
  const mockErrorCallback = vi.fn()

  const checkServiceMultiple = new CheckServiceMultiple(
    [mockRepository1, mockRepository2, mockRepository3],
    mockSuccessCallback,
    mockErrorCallback,
  )

  test('should call successCallback when fetch returns true', async () => {
    const wasOk = await checkServiceMultiple.execute('https://google.com')

    expect(wasOk).toBeTruthy()
    expect(mockSuccessCallback).toHaveBeenCalled()
    expect(mockErrorCallback).not.toHaveBeenCalled()
    expect(mockRepository1.saveLog).toBeCalledWith(expect.any(LogEntity))
    expect(mockRepository2.saveLog).toBeCalledWith(expect.any(LogEntity))
    expect(mockRepository3.saveLog).toBeCalledWith(expect.any(LogEntity))
  })

  test('should call errorCallback when fetch returns false', async () => {
    const wasOk = await checkServiceMultiple.execute(
      'https://fakedomain245342fg3gvh.com',
    )

    expect(wasOk).toBeFalsy()
    expect(mockSuccessCallback).not.toHaveBeenCalled()
    expect(mockErrorCallback).toHaveBeenCalled()
    expect(mockRepository1.saveLog).toBeCalledWith(expect.any(LogEntity))
    expect(mockRepository2.saveLog).toBeCalledWith(expect.any(LogEntity))
    expect(mockRepository3.saveLog).toBeCalledWith(expect.any(LogEntity))
  })
})
