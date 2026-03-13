import { PrismaPg } from '@prisma/adapter-pg'
import {
  PrismaClient,
  LogSeverityLevel as SeverityLevel,
} from '../../../generated/prisma/client'

import { envs } from '../../plugins/envs.plugin'
import { LogDatasource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

const connectionString = envs.DATABASE_URL
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource extends LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    try {
      const newLog = await prisma.logModel.create({
        data: {
          ...log,
          level: severityEnum[log.level],
        },
      })

      console.log('Postgres log created', newLog)
    } catch (error) {
      console.error('Save postgres data error')
      console.log(error)
    }
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    try {
      const logs = await prisma.logModel.findMany({
        where: { level: severityEnum[severityLevel] },
      })
      return logs.map(LogEntity.fromObject)
    } catch (error) {
      console.error('Get postgres data error')
      return []
    }
  }
}
