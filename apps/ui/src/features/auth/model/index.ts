import { login } from './effects/login';
import { checkSession } from './effects/check-session';

export { actions, name, reducer } from './model';

export const effects = {
  login,
  checkSession,
};

export * from './selectors';

export { SignUpSchemaExtended } from './schemas/sign-up.schema';
export { VerificationSchemaExtended } from './schemas/verification.schema';
