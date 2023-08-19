import { Test, TestingModule } from '@nestjs/testing';
import { SendgridService } from '@app/infrastructure/mail/services/sendgrid.service';
import { MailService } from '@sendgrid/mail';
import { generateVerificationCode } from '@app/domain/auth/lib/generateVerificationCode';
import { lastValueFrom } from 'rxjs';
import { SENDGRID_SERVICE } from '@app/infrastructure/mail/config/constants';
import { ConfigModule } from '@nestjs/config';

describe('SendgridService', () => {
  let service: SendgridService;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        SendgridService,
        {
          provide: SENDGRID_SERVICE,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SendgridService>(SendgridService);
    mailService = module.get<MailService>(SENDGRID_SERVICE);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('MailService should be defined', () => {
    expect(mailService).toBeDefined();
  });

  it('should call MailService.send', async () => {
    const sendSpy = jest.spyOn(mailService, 'send').mockResolvedValue({} as any);

    await lastValueFrom(service.sendVerificationUserCode(MESSAGE));
    expect(sendSpy).toBeCalledTimes(1);
    expect(sendSpy).toBeCalledWith(MESSAGE, false);
  });
});

const TEST_USER = {
  email: 'alexborysovdev@gmail.com',
};
const MESSAGE = { code: generateVerificationCode(), email: TEST_USER.email };
