import { z } from 'zod';
import { NotificationProvider } from '@prisma/client';

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: 'must be longer' }).max(30, { message: 'must be shorter' }),
  surname: z.string().min(2, { message: 'must be longer' }).max(30, { message: 'must be shorter' }),
  email: z.string().min(1, { message: 'must be longer' }).email({ message: 'must be valid' }),
  password: z.string().min(6, { message: 'must be longer' }),
  phoneNumber: z.string().min(7, { message: 'must be valid' }).max(15, { message: 'must be valid' }),
  notificationProvider: z.nativeEnum(NotificationProvider, { errorMap: () => ({ message: 'must be specified' }) }),
});
