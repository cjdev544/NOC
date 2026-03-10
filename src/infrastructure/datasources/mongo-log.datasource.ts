import { LogModel } from '../../data/mongo'
import { LogDatasource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export class MongoLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    try {
      const newLog = await LogModel.create(log)
      console.log('Mongo log created', newLog.id)
    } catch (error) {
      console.error('Save mongo data error')
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    try {
      const logs = await LogModel.find({ level: severityLevel })
      return logs.map(LogEntity.fromObject)
    } catch (error) {
      console.error('Get mongo data error')
      return []
    }
  }
}
