export type Tab = 'sign-up' | 'log-in';

export type Step = 'credentials' | 'verification';

export type SignInProcess = {
  tab: Tab;
  step: Step;
};
