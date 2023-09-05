import { z } from 'zod';
import { NotificationProvider } from '@prisma/client';
import { createUnionSchema } from '@utils/zod/create-union';

const NotificationProviderUnion = createUnionSchema(
  [NotificationProvider.MESSENGER, NotificationProvider.TELEGRAM, NotificationProvider.WHATSAPP] as const,
  { message: 'must be specified' },
);

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: 'must be longer' }).max(30, { message: 'must be shorter' }),
  surname: z.string().min(2, { message: 'must be longer' }).max(30, { message: 'must be shorter' }),
  email: z.string().min(1, { message: 'must be longer' }).email({ message: 'must be valid' }),
  password: z.string().min(6, { message: 'must be longer' }),
  phoneNumber: z.string().min(7, { message: 'must be valid' }).max(15, { message: 'must be valid' }),
  notificationProvider: NotificationProviderUnion,
});
