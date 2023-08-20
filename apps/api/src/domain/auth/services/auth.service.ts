import { extractTokenFromHeader } from '@app/domain/auth/lib/extractTokenFromHeader';
import { HashService } from '@app/domain/auth/services/hash.service';
import { UserRepository } from '@app/domain/user/services/user.repository';
import { LoginInput } from '@dto';
import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpStatusCode } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async login({ email, password }: LoginInput) {
    const user = await this.userRepository.findByEmail({ email });

    if (!user) throw new HttpException('Invalid credentials', 400);

    if (!user.verified) throw new HttpException('Please, verify your account', HttpStatusCode.Conflict);

    const isPasswordMatch = await this.hashService.compare(password, user.password);
    if (!isPasswordMatch) throw new HttpException('Invalid credentials', 400);

    const accessToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '7m' });
    const refreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '5d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  async checkSession(req: Request) {
    const bearer = extractTokenFromHeader(req);
    if (!bearer) throw new HttpException('Invalid token', HttpStatusCode.NotFound);

    const { sub } = await this.jwtService.verifyAsync(bearer);
    const sessionUser = this.userRepository.findById({
      id: sub,
      select: {
        email: true,
        id: true,
        name: true,
        notificationProvider: true,
        phoneNumber: true,
        role: true,
        surname: true,
        verified: true,
      },
    });

    return sessionUser;
  }
}
