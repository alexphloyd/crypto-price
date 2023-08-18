import { Module } from '@nestjs/common';
import { AuthModule } from '@app/domain/auth/auth.module';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './services/user.repository';
import { MailModule } from '@app/infrastructure/mail/mail.module';
import { PrismaService } from '@app/infrastructure/db/prisma.service';

@Module({
  imports: [AuthModule, MailModule],
  controllers: [UserController],
  providers: [PrismaService, UserRepository],
})
export class UserModule {}
