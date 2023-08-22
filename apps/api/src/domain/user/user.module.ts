import { Module } from '@nestjs/common';
import { PrismaService } from '@app/infrastructure/db/prisma.service';
import { UserRepository } from '@app/domain/user/services/user.repository';

@Module({
  providers: [PrismaService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
