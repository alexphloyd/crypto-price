import { sendgridProviders } from '@app/infrastructure/mail/providers/sendgrid.providers';
import { SendgridService } from '@app/infrastructure/mail/services/sendgrid.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SendgridService, ...sendgridProviders],
  exports: [SendgridService, ...sendgridProviders],
})
export class MailModule {}
