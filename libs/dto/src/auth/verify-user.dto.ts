import { IsInt, IsString } from 'class-validator';

export class VerifyUserDto {
  @IsInt()
  userId: number;

  @IsString()
  code: string;
}

export type VerifyUserInput = VerifyUserDto;
