import { SignUpDto } from '@dto';
import { IsString, MinLength } from 'class-validator';
import { Match } from '@utils';

export class ExtendedSignUpDto extends SignUpDto {
  @IsString({ message: 'is required' })
  @MinLength(6, { message: 'must be longer' })
  @Match('password', { message: `don't match` })
  confirmPassword: string;
}

export type ExtendedSignUpInput = ExtendedSignUpDto;
