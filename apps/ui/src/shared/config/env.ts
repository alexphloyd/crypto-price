import { z } from 'zod';

const envVariables = z.object({
  API_URL: z.string().url(),
});

envVariables.parse(import.meta.env);

export const ENV_CONFIG = {
  API_URL: import.meta.env.VITE_API_URL,
} as const;
