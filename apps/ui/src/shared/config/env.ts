import { z } from 'zod';

const envVariables = z.object({
  VITE_AUTH_SERVICE_URL: z.string().url(),
  VITE_COINS_SERVICE_URL: z.string().url(),
});

envVariables.parse(import.meta.env);

export const ENV_CONFIG = {
  AUTH_SERVICE_URL: import.meta.env.VITE_AUTH_SERVICE_URL,
  COINS_SERVICE_URL: import.meta.env.VITE_COINS_SERVICE_URL,
} as const;
