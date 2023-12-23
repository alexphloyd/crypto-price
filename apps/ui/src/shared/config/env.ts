import { z } from 'zod';

const envVariables = z.object({
  VITE_AUTH_SERVICE_URL: z.string().url(),
  VITE_CRYPTO_SERVICE_URL: z.string().url(),
  VITE_CRYPTO_SERVICE_KEY: z.string(),
});

envVariables.parse(import.meta.env);

export const ENV_CONFIG = {
  AUTH_SERVICE_URL: import.meta.env.VITE_AUTH_SERVICE_URL,
  CRYPTO_SERVICE_URL: import.meta.env.VITE_CRYPTO_SERVICE_URL,
  CRYPTO_SERVICE_KEY: import.meta.env.VITE_CRYPTO_SERVICE_KEY,
} as const;
