import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { LogDatasource } from '../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../domain/entities/log.entity'

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/'
  private readonly allLogsPath = 'logs/logs-all.log'
  private readonly mediumLogsPath = 'logs/logs-medium.log'
  private readonly highLogsPath = 'logs/logs-high.log'

  constructor() {
    this.createLogsFiles()
  }

  private createLogsFiles() {
    if (!existsSync(this.logPath)) {
      mkdirSync(this.logPath)
    }

    ;[this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!existsSync(path)) return
        writeFileSync(path, '')
      },
    )
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`

    appendFileSync(this.allLogsPath, logAsJson)
    if (newLog.level === LogSeverityLevel.low) return

    if (newLog.level === LogSeverityLevel.medium) {
      appendFileSync(this.mediumLogsPath, logAsJson)
      return
    }
    if (newLog.level === LogSeverityLevel.high) {
      appendFileSync(this.highLogsPath, logAsJson)
      return
    }
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = readFileSync(path, 'utf-8')
    const logs = content.split('\n').map(LogEntity.fromJson)
    return logs
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logSeverityLevel = {
      [LogSeverityLevel.low]: this.getLogsFromFile(this.allLogsPath),
      [LogSeverityLevel.medium]: this.getLogsFromFile(this.mediumLogsPath),
      [LogSeverityLevel.high]: this.getLogsFromFile(this.highLogsPath),
    }

    const severity = logSeverityLevel[severityLevel]
    if (!severity) throw new Error(`${severityLevel} is not implemented`)

    return severity
  }
}
