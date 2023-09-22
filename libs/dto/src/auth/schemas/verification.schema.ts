import { z } from 'zod';

export const VerificationSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6, { message: 'must be longer' }),
});
