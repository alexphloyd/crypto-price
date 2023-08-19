import { UserRepository } from '@app/domain/user/services/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { generateVerificationCode } from './../lib/generateVerificationCode';
import { PrismaService } from '@app/infrastructure/db/prisma.service';
import { TypeOfValue } from '@utility-types';
import { type VerifyUserInput } from '@dto';
import { SendgridService } from '@app/infrastructure/mail/services/sendgrid.service';

@Injectable()
export class VerificationService {
  constructor(
    private userRepository: UserRepository,
    private mailService: SendgridService,
    private db: PrismaService,
  ) {}

  async sendVerificationCode({ email }: { email: TypeOfValue<User, 'email'> }) {
    const user = await this.userRepository.findByEmail({
      email,
      select: { verified: true, verificationCode: true },
    });

    if (!user) throw Error('User is not created yet');
    if (user.verified) throw Error('User is already verified');

    const existedVerificationCode = await this.db.verificationCode.findFirst({
      where: {
        email,
      },
    });
    const code = existedVerificationCode ? existedVerificationCode.code : generateVerificationCode();

    if (!existedVerificationCode) {
      await this.db.verificationCode.create({
        data: {
          email,
          code,
        },
      });
    }

    this.mailService.sendVerificationUserCode({ email, code });
  }

  async verify({ userId, code }: VerifyUserInput) {
    const user = await this.userRepository.findById({
      id: userId,
      select: { verificationCode: true },
    });

    if (user && user.verified) throw new Error('User is already verified');

    const userVerification = await this.db.verificationCode.findFirst({
      where: {
        email: user?.email,
      },
    });

    if (userVerification?.code === code) {
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
