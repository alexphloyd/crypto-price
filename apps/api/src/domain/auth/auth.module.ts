import { Module } from '@nestjs/common';
import { HashService } from '@app/domain/auth/services/hash.service';
import { VerificationService } from '@app/domain/auth/services/verification.service';
import { MailModule } from '@app/infrastructure/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@app/domain/user/user.module';
import { PrismaService } from '@app/infrastructure/db/prisma.service';
import { AuthService } from '@app/domain/auth/services/auth.service';
import { AuthController } from '@app/domain/auth/controller/auth.controller';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    MailModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('AUTH_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [HashService, VerificationService, PrismaService, AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
