import { createZodDto } from 'nestjs-zod';
import { LoginSchema } from '../schemas/login.schema';

export class LoginDto extends createZodDto(LoginSchema) {}
