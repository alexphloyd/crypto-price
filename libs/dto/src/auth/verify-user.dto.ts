import { IsInt, IsString } from 'class-validator';

export class VerifyUserDto {
  @IsInt()
  userId: number;

  @IsString({ message: 'is required' })
  code: string;
}

export type VerifyUserInput = VerifyUserDto;
