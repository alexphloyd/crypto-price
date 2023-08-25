import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { NotificationProvider } from '@prisma/client';

export class SignUpDto {
  @IsString({ message: 'is required' })
  @MinLength(2, { message: 'must be longer' })
  @MaxLength(30, { message: 'must be shorter ' })
  name: string;

  @IsString({ message: 'is required' })
  @MinLength(2, { message: 'must be longer' })
  @MaxLength(30, { message: 'must be shorter' })
  surname: string;

  @IsString({ message: 'is required' })
  @IsEmail(undefined, { message: 'must be valid' })
  email: string;

  @IsString({ message: 'is required' })
  @MinLength(6, { message: 'must be longer' })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'too weak' })
  password: string;

  @IsEnum(NotificationProvider, { message: 'must be specified' })
  notificationProvider: NotificationProvider;

  @IsString({ message: 'is required' })
  @MinLength(7, { message: 'must be valid' })
  @MaxLength(15, { message: 'must be valid' })
  phoneNumber: string;
}

export type SignUpInput = SignUpDto;