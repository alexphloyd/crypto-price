import { User } from '@prisma/client';

export type Tab = 'sign-up' | 'log-in';

export type Step = 'credentials' | 'verification';

export type SignInProcess = {
  tab: Tab;
  step: Step;
  credentials?: Partial<User>;
};

export type LoginProcess = {
  error: ErrorMessage;
};
