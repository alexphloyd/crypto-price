import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { NotificationProvider } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'must be at least 3 characters long' })
  @MaxLength(30, { message: 'must be shorter than 30 characters' })
  name: string;

  @IsString()
  @MinLength(2, { message: 'must be at least 2 characters long' })
  @MaxLength(30, { message: 'must be shorter than 30 characters' })
  surname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'must be at least 8 characters long' })
  password: string;

  @IsEnum(NotificationProvider)
  notificationProvider: NotificationProvider;

  @IsString()
  phoneNumber: string;
}

export type CreateUserInput = CreateUserDto;
