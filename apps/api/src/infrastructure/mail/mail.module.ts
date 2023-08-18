import { MailService } from './services/mail.service';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService as MailSenderService } from '@sendgrid/mail';

@Module({
  providers: [MailService, ConfigService, MailSenderService],
  exports: [MailService, MailSenderService],
})
export class MailModule {}
