import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource'
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'
// import { EmailService } from './email/email.service'
// import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'
// import { CheckService } from '../domain/use-cases/checks/check-service'

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource())
const mongoRepository = new LogRepositoryImpl(new MongoLogDatasource())
const postgresRepository = new LogRepositoryImpl(new PostgresLogDatasource())

export class Server {
  public static start() {
    console.log('Server started...')

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com'
      new CheckServiceMultiple(
        [fileSystemRepository, mongoRepository, postgresRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error),
      ).execute(url)
    })

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com'
    //   new CheckService(
    //     fileSystemRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url)
    // })

    // const emailService = new EmailService()
    // new SendEmailLogs(emailService, fileSystemRepository).execute([
    //   'cjminer544@gmail.com',
    //   'cjdev544@gmail.comn',
    // ])
  }
}
