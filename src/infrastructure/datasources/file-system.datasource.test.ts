import { beforeEach, describe, expect, test } from 'vitest'
import { FileSystemDatasource } from './file-system.datasource'
import { readdirSync, rmSync } from 'node:fs'
import path from 'node:path'

describe('file-system.datasource.test.ts', () => {
  const logPath = path.join(__dirname, '../../../logs')

  beforeEach(() => {
    rmSync(logPath, { recursive: true, force: true })
  })

  test('should create logs files if they not exist', () => {
    new FileSystemDatasource()
    const files = readdirSync(logPath)

    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
  })
})
