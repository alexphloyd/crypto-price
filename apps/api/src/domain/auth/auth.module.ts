import { Module } from '@nestjs/common';
import { HashService } from '@app/domain/auth/services/hash.service';
import { VerificationService } from '@app/domain/auth/services/verification.service';
import { UserRepository } from '@app/domain/user/services/user.repository';
import { PrismaService } from '@app/infrastructure/db/prisma.service';
import { MailModule } from '@app/infrastructure/mail/mail.module';

@Module({
  imports: [MailModule],
  providers: [HashService, UserRepository, VerificationService, PrismaService],
  exports: [HashService, VerificationService],
})
export class AuthModule {}
