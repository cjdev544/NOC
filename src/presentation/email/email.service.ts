import nodemailer from 'nodemailer'

import { envs } from '../../plugins/envs.plugin'

interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachment[]
}

interface Attachment {
  filename: string
  path: string
}

export class EmailService {
  private origin: string = 'email.service.ts'
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  })

  async sendMail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      })

      return true
    } catch (error) {
      return false
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = 'server logs'
    const htmlBody = `
    <h3>System logs</h3>
    <p>body logs</p>
    `
    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
    ]

    return await this.sendMail({
      to,
      subject,
      htmlBody,
      attachments,
    })
  }
}
