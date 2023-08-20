import { AuthService } from '@app/domain/auth/services/auth.service';
import { HashService } from '@app/domain/auth/services/hash.service';
import { VerificationService } from '@app/domain/auth/services/verification.service';
import { UserRepository } from '@app/domain/user/services/user.repository';
import { CreateUserDto, LoginDto, VerifyUserDto } from '@dto';
import { Body, Controller, Get, HttpException, InternalServerErrorException, Post, Put, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private verificationService: VerificationService,
    private authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() data: CreateUserDto) {
    const hashedPassword = await this.hashService.hash(data.password);
    const user = {
      ...data,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.create(user);
    if (!createdUser) throw new HttpException('Unable to create this user', 409);

    await this.verificationService.sendVerificationCode({
      email: createdUser.email,
    });

    return createdUser;
  }

  @Put('verify')
  async verify(@Body() { code, userId }: VerifyUserDto) {
    const user = await this.verificationService.verify({ code, userId });
    if (!user?.verified) throw new InternalServerErrorException();

    return {
      verified: user.verified,
    };
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Get('session')
  async session(@Req() req: Request) {
    const sessionUser = await this.authService.checkSession(req);
    return sessionUser;
  }
}
