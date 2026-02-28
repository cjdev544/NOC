import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repositories/log.repository'

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
    private origin: string = 'check-service.ts',
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `${url} is working`,
        origin: this.origin,
      })
      this.logRepository.saveLog(log)

      this.successCallback()
      return true
    } catch (error) {
      const errorMessage = `${url} is not working ${error}`
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: errorMessage,
        origin: this.origin,
      })

      this.errorCallback(errorMessage)
      return false
    }
  }
}
