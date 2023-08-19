import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationProvider } from '@prisma/client';
import { PrismaService } from '@app/infrastructure/db/prisma.service';
import { UserRepository } from '@app/domain/user/services/user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@app/domain/auth/auth.module';
import { UserModule } from '@app/domain/user/user.module';
import { AppModule } from '@app/application/app.module';
import { AuthService } from '@app/domain/auth/services/auth.service';
import { HashService } from '@app/domain/auth/services/hash.service';
import { VerificationService } from '@app/domain/auth/services/verification.service';
import { sendgridProviders } from '@app/infrastructure/mail/providers/sendgrid.providers';
import { SendgridService } from '@app/infrastructure/mail/services/sendgrid.service';
import { MailService } from '@sendgrid/mail';
import { JwtModule } from '@nestjs/jwt';

describe('auth-controller', () => {
  let authController: AuthController;
  let user: UserRepository;
  let db: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule,
        UserModule,
        AppModule,
        JwtModule.registerAsync({
          useFactory: async (config: ConfigService) => ({
            secret: config.get('AUTH_SECRET_KEY'),
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        HashService,
        VerificationService,
        PrismaService,
        SendgridService,
        MailService,
        ...sendgridProviders,
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    user = app.get<UserRepository>(UserRepository);
    db = app.get<PrismaService>(PrismaService);

    await db.verificationCode
      .delete({
        where: {
          email: TEST_USER.email,
        },
      })
      .catch(() => 'code is not found');
    await user
      .delete({
        where: {
          email: TEST_USER.email,
        },
      })
      .catch(() => 'user is not found');
  });

  it('sign-up and send code to email', async () => {
    await authController.signUp(TEST_USER);
  });
});

const TEST_USER = {
  email: 'alexborysovdev@gmail.com',
  name: 'alex',
  notificationProvider: 'TELEGRAM' as NotificationProvider,
  password: 'configuration',
  phoneNumber: '48562933119',
  surname: 'configuration',
};
