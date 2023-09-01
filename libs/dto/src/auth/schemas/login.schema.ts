import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1, { message: 'must be longer' }).email({ message: 'must be valid' }),
  password: z.string().min(6, { message: 'must be longer' }),
});
