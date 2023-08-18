import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@app/domain/user/user.module';
import { AuthModule } from '@app/domain/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '/.env', isGlobal: true }), UserModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
