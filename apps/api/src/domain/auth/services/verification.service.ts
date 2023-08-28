import { z } from 'nestjs-zod/z';
import { UserRepository } from '@app/domain/user/services/user.repository';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';
import { generateVerificationCode } from './../lib/generateVerificationCode';
import { PrismaService } from '@app/infrastructure/db/prisma.service';
import { TypeOfValue } from '@utility-types';
import { SendgridService } from '@app/infrastructure/mail/services/sendgrid.service';
import { VerificationSchema } from '@dto';

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

  async verify({ userId, code }: z.infer<typeof VerificationSchema>) {
    const user = await this.userRepository.findById({
      id: userId,
      select: { verificationCode: true, verified: true },
    });

    if (user && user.verified) return user;

    const userVerification = await this.db.verificationCode.findFirst({
      where: {
        email: user?.email,
      },
    });

    if (!userVerification) throw new InternalServerErrorException();
    if (userVerification.code !== code) throw new HttpException('Wrong verification code', HttpStatus.CONFLICT);

    const verifiedUser = await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        verified: true,
      },
    });

    return verifiedUser;
  }
}
