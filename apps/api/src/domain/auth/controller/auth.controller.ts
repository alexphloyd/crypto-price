import { HashService } from '@app/domain/auth/services/hash.service';
import { VerificationService } from '@app/domain/auth/services/verification.service';
import { UserRepository } from '@app/domain/user/services/user.repository';
import { CreateUserDto, VerifyUserDto } from '@dto';
import { Body, Controller, InternalServerErrorException, Post, Put } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private verificationService: VerificationService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() data: CreateUserDto) {
    const hashedPassword = await this.hashService.hash(data.password);
    const user = {
      ...data,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.create(user);
    if (!createdUser) throw new Error('Unable to create this user');

    await this.verificationService.sendVerificationCode({
      email: createdUser.email,
    });

    return createdUser;
  }

  @Put('verify')
  async verify(@Body() { code, userId }: VerifyUserDto) {
    const user = await this.verificationService.verify({ code, userId });
    if (!user?.verified) throw new InternalServerErrorException();

    return user;
  }

  // @Post('login')
  // async login(@Body() data: LoginDto) {}
}
