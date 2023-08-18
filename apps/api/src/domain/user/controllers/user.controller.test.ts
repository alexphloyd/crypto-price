import { UserController } from '@app/domain/user/controllers/user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationProvider } from '@prisma/client';
import { VerificationService } from '@app/domain/auth/services/verification.service';
import { PrismaService } from '@app/infrastructure/db/prisma.service';
import { MailService as SendGridService } from '@sendgrid/mail';
import { UserRepository } from '@app/domain/user/services/user.repository';
import { MailService } from '@app/infrastructure/mail/services/mail.service';
import { ConfigService } from '@nestjs/config';
import { HashService } from '@app/domain/auth/services/hash.service';

describe('user-controller', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        PrismaService,
        SendGridService,
        MailService,
        VerificationService,
        UserRepository,
        ConfigService,
        HashService,
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  it('should create new user and send code to email', async () => {
    await userController.create(TEST_USER);
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
