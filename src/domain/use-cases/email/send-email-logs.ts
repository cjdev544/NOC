import { EmailService } from '../../../presentation/email/email.service'
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repositories/log.repository'

interface SendEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendEmailUseCase {
  private origin: string = 'send-email-logs'

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]) {
    try {
      const send = await this.emailService.sendEmailWithFileSystemLogs(to)
      if (!send) throw new Error('Email not send')

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email send',
        origin: this.origin,
      })

      this.logRepository.saveLog(log)

      return true
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: this.origin,
      })

      this.logRepository.saveLog(log)
      return false
    }
  }
}
