import { SignUpSchema } from '@dto/auth/schemas/sign-up.schema';
import { z } from 'zod';

export const SignUpSchemaExtended = SignUpSchema.extend({
  confirm: z.string().min(6, { message: 'must be longer' }),
}).refine((data) => data.confirm === data.password, { path: ['confirm'], message: `don't match` });
