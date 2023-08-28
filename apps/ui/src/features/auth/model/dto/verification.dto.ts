import { VerifyUserDto } from '@dto';
import { MinLength } from 'class-validator';

export class MappedVerificationDto {
  code: VerifyUserDto['code'];
}

export type MappedVerificationInput = MappedVerificationDto;
