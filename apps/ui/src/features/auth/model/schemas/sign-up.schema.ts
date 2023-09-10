import { SignUpSchema } from '@dto/auth/schemas/sign-up.schema';
import { z } from 'zod';

export const SignUpSchemaExtended = SignUpSchema.extend({
  confirm: z.string().min(6, { message: 'must be longer' }),
}).superRefine(({ password, confirm }, ctx) => {
  if (password !== confirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `don't match`,
      path: ['confirm'],
    });
  }
});
