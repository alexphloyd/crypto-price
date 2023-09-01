import { SignUpSchema } from '../schemas/sign-up.schema';
import { createZodDto } from 'nestjs-zod';

export class SignUpDto extends createZodDto(SignUpSchema) {}
