import { Body, Controller, InternalServerErrorException, Post, Put } from '@nestjs/common';
import { HashService } from '@app/domain/auth/services/hash.service';
import { VerificationService } from '@app/domain/auth/services/verification.service';
import { UserRepository } from '@app/domain/user/services/user.repository';
import { CreateUserDto, VerifyUserDto } from '@dto';

@Controller('user')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private verificationService: VerificationService,
  ) {}

  @Post('create')
  async create(@Body() data: CreateUserDto) {
    const hashedPassword = await this.hashService.hash(data.password);
    const user = {
      ...data,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.create(user).catch((error) => {
      if (error.code === 'P2002') throw new Error('Email is already in use');
    });

    if (!createdUser) throw new Error('Unable to create this user');

    this.verificationService.sendVerificationCode({
      email: createdUser.email,
    });

    return createdUser;
  }

  @Put('verify')
  async verify(@Body() { code, userId }: VerifyUserDto) {
    const verifiedUser = await this.verificationService.verify({ code, userId });
    if (!verifiedUser) throw new InternalServerErrorException();

    return verifiedUser;
  }
}
