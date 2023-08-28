export type RefreshRes = Promise<{
  access: string;
  refresh: string;
}>;

export type VerifyRes = Promise<{
  verified: boolean;
}>;
