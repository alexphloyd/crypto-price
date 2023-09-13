import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { MailService } from '@sendgrid/mail';
import { TypeOfValue } from '@utils/types';
import { SENDGRID_SERVICE } from '@app/infrastructure/mail/config/constants';
import { SEND_VERIFICATION_CODE_TEMPLATE } from '@app/infrastructure/mail/config/templates';
import { from } from 'rxjs';

@Injectable()
export class SendgridService {
  constructor(@Inject(SENDGRID_SERVICE) private mailService: MailService, private config: ConfigService) {}
  private from = this.config.get('MAIL_FROM');

  sendVerificationUserCode({ code, email }: { code: string; email: TypeOfValue<User, 'email'> }) {
    return from(
      this.mailService.send({
        from: this.from,
        to: email,
        subject: 'Welcome to Demure!',
        templateId: SEND_VERIFICATION_CODE_TEMPLATE,
        dynamicTemplateData: {
          code,
        },
      }),
    );
  }
}
