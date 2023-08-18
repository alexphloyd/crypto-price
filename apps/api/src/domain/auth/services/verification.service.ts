import { UserRepository } from '@app/domain/user/services/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { generateVerificationCode } from './../lib/generateVerificationCode';
import { MailService } from '@app/infrastructure/mail/services/mail.service';
import { PrismaService } from '@app/infrastructure/db/prisma.service';
import { TypeOfValue } from '@utility-types';
import { type VerifyUserInput } from '@dto';

@Injectable()
export class VerificationService {
  constructor(private userRepository: UserRepository, private mailService: MailService, private db: PrismaService) {}

  async sendVerificationCode({ email }: { email: TypeOfValue<User, 'email'> }) {
    const user = await this.userRepository.findByEmail({
      email,
      select: { verified: true, verificationCode: true },
    });

    if (!user) throw Error('User is not created yet');
    if (user.verified) throw Error('User is already verified');

    const existedVerificationCode = user.verificationCode?.code;
    const code = existedVerificationCode ? existedVerificationCode : generateVerificationCode();

    if (!existedVerificationCode) {
      await this.db.verificationCode.create({
        data: {
          email,
          code,
        },
      });
    }

    await this.mailService.sendVerificationUserCode({ email, code });
  }

  async verify({ userId, code }: VerifyUserInput) {
    const user = await this.userRepository.findById({
      id: userId,
      select: { verificationCode: true },
    });

    if (user || user.verificationCode.code) throw new Error('Unable to verify this user');

    if (user.verificationCode.code === code) {
      await this.db.user.update({
        where: {
          id: userId,
        },
        data: {
          verified: true,
        },
      });
    }

    return user;
  }
}
