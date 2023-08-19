import { AppModule } from './../../../application/app.module';
import { UserModule } from '@app/domain/user/user.module';
import { AuthModule } from '@app/domain/auth/auth.module';
import { AuthService } from './auth.service';
import { UserRepository } from '@app/domain/user/services/user.repository';
import { PrismaService } from '@app/infrastructure/db/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationProvider } from '@prisma/client';
import { HashService } from '@app/domain/auth/services/hash.service';
import { VerificationService } from '@app/domain/auth/services/verification.service';
import { SendgridService } from '@app/infrastructure/mail/services/sendgrid.service';
import { MailService } from '@sendgrid/mail';
import { sendgridProviders } from '@app/infrastructure/mail/providers/sendgrid.providers';

describe('auth-service', () => {
  let authService: AuthService;
  let user: UserRepository;
  let db: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UserModule,
        AppModule,
        JwtModule.registerAsync({
          useFactory: async (config: ConfigService) => ({
            secret: config.get('AUTH_SECRET_KEY'),
          }),
          inject: [ConfigService],
        }),
      ],
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

    authService = app.get<AuthService>(AuthService);
    user = app.get<UserRepository>(UserRepository);
    db = app.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
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

  it('should login user', async () => {
    const newUser = await user.create(TEST_USER);
    let tokens: object;

    expect(newUser).toBeDefined();

    if (newUser) {
      tokens = await authService.login({ email: newUser.email, password: TEST_USER.password });
      console.log(tokens, 'TOKENS');

      // expect(tokens).toHaveProperty('accessToken');
      // expect(tokens).toHaveProperty('refreshToken');
    }
  });
});

const TEST_USER = {
  email: 'alexborysovdev@gmail.com',
  name: 'alex',
  notificationProvider: 'TELEGRAM' as NotificationProvider,
  password: 'aijfdiojafads',
  phoneNumber: '48562933119',
  surname: 'fgrrerg',
};
