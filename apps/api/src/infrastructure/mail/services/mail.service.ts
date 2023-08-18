import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { MailService as MailSenderService } from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { TypeOfValue } from '@utility-types';

@Injectable()
export class MailService {
  constructor(private mail: MailSenderService, private config: ConfigService) {
    const API_KEY = this.config.get('MAIL_API_KEY');
    this.mail.setApiKey(API_KEY);
  }

  from = this.config.get('MAIL_FROM');

  async sendVerificationUserCode({ code, email }: { code: string; email: TypeOfValue<User, 'email'> }) {
    return await this.mail.send({
      from: this.from,
      to: email,
      subject: 'Welcome to sync-vision!',
      templateId: 'd-fb85c7775aa348ec8d8286840948a96a',
      dynamicTemplateData: {
        code,
      },
    });
  }
}
