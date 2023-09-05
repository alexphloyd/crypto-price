import { VerificationSchema } from '@dto/auth/schemas/verification.schema';

export const VerificationSchemaExtended = VerificationSchema.pick({ code: true });
