import { Test, TestingModule } from '@nestjs/testing';
import { NotificationProvider } from '@prisma/client';
import { VerificationService } from '@app/domain/auth/services/verification.service';
import { PrismaService } from '@app/infrastructure/db/prisma.service';
import { AppModule } from '@app/application/app.module';
import { SendgridService } from '@app/infrastructure/mail/services/sendgrid.service';
import { MailService } from '@sendgrid/mail';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from '@app/domain/user/services/user.repository';
import { sendgridProviders } from '@app/infrastructure/mail/providers/sendgrid.providers';

describe('verification', () => {
  let verificationService: VerificationService;
  let db: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ConfigModule],
      providers: [
        VerificationService,
        PrismaService,
        SendgridService,
        MailService,
        UserRepository,
        ...sendgridProviders,
      ],
    }).compile();

    db = app.get<PrismaService>(PrismaService);
    verificationService = app.get<VerificationService>(VerificationService);

    const user = await db.user.findFirst({
      where: {
        email: userData.email,
      },
    });
    if (!user) {
      await db.user.create({
        data: userData,
      });
    }
  });

  afterEach(async () => {
    const user = await db.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (user) {
      await db.verificationCode
        .delete({
          where: {
            email: user.email,
          },
        })
        .catch(() => 'not found');
      await db.user
        .delete({
          where: {
            id: user.id,
          },
        })
        .catch(() => 'not found');
    }
  });

  it('should send code to email', async () => {
    const errors = await verificationService.sendVerificationCode({ email: 'alexborysovdev@gmail.com' });
    expect(errors).toBeUndefined();
  });
});

const userData = {
  email: 'alexborysovdev@gmail.com',
  name: 'alex',
  notificationProvider: 'TELEGRAM' as NotificationProvider,
  password: 'aijfdiojafads',
  phoneNumber: '48562933119',
  surname: 'fgrrerg',
};
