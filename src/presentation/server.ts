import { CheckService } from '../domain/use-cases/checks/check-service'
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'
import { FileSystemDatasource } from '../infrastructure/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { EmailService } from './email/email.service'

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource())
export class Server {
  public static start() {
    console.log('Server started...')

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com'
    //   new CheckService(
    //     fileSystemRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url)
    // })

    const emailService = new EmailService()
    new SendEmailLogs(emailService, fileSystemRepository).execute([
      'cjminer544@gmail.com',
      'cjdev544@gmail.comn',
    ])
  }
}
