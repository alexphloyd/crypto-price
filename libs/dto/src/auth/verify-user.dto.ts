import { IsInt, IsString, MinLength } from 'class-validator';

export class VerifyUserDto {
  @IsInt()
  userId: number;

  @IsString({ message: 'is required' })
  @MinLength(6, { message: 'Must be longer' })
  code: string;
}

export type VerifyUserInput = VerifyUserDto;
