import { User } from '@prisma/client';

export type RefreshResponse = Promise<Tokens>;

export type VerifyResponse = Promise<{
  verified: boolean;
}>;

export type LoginResponse = Promise<{
  tokens: Tokens;
  user: User;
}>;

export type SessionResponse = Promise<{
  user: User;
} | null>;

type Tokens = {
  access: string;
  refresh: string;
};
