export type RefreshResponse = Promise<{
  access: string;
  refresh: string;
}>;

export type VerifyResponse = Promise<{
  verified: boolean;
}>;

export type LoginResponse = Promise<{
  access: string;
  refresh: string;
}>;
