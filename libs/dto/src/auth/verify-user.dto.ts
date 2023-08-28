import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const VerificationSchema = z.object({
  userId: z.number(),
  code: z.string().min(6, { message: 'must be longer' }),
});

export class VerificationDto extends createZodDto(VerificationSchema) {}
