import { z } from 'zod';

export const VerificationSchema = z.object({
  userId: z.number(),
  code: z.string().min(6, { message: 'must be longer' }),
});
