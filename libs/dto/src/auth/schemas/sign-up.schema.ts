import { NotificationProvider, type NotificationProvider as PossibleNotificationProviders } from '@prisma/client';
import { z } from 'zod';

const NotificationProviders = Object.values(NotificationProvider);

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: 'must be longer' }).max(30, { message: 'must be shorter' }),
  surname: z.string().min(2, { message: 'must be longer' }).max(30, { message: 'must be shorter' }),
  email: z.string().min(1, { message: 'must be longer' }).email({ message: 'must be valid' }),
  password: z.string().min(6, { message: 'must be longer' }),
  notificationProvider: z
    .string()
    .refine((arg) => NotificationProviders.includes(arg as PossibleNotificationProviders), {
      message: 'must be specified',
    }),
  phoneNumber: z.string().min(7, { message: 'must be valid' }).max(15, { message: 'must be valid' }),
});
