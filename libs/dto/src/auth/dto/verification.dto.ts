import { VerificationSchema } from '../schemas/verification.schema';
import { createZodDto } from 'nestjs-zod';

export class VerificationDto extends createZodDto(VerificationSchema) {}
