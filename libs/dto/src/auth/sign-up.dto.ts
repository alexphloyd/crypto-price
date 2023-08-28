import { NotificationProvider } from '@prisma/client';
import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const SignUpSchema = z
  .object({
    name: z.string().min(2, { message: 'must be longer' }).max(30, { message: 'must be shorter' }),
    surname: z.string().min(2, { message: 'must be longer' }).max(30, { message: 'must be shorter' }),
    email: z.string().min(1, { message: 'must be longer' }).email({ message: 'must be valid' }),
    password: z.string().min(6, { message: 'must be longer' }),
    notificationProvider: z.nativeEnum(NotificationProvider),
    phoneNumber: z.string().min(7, { message: 'must be valid' }).max(15, { message: 'must be valid' }),
  })
  .refine((data) => data.notificationProvider.length, {
    message: 'must be specified',
    path: ['notificationProvider'],
  });

export class SignUpDto extends createZodDto(SignUpSchema) {}
