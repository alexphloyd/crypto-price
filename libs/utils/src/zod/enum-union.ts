import { z } from 'zod';

interface Params {
  object: object;
  options?: Pick<z.ZodCustomIssue, 'message' | 'path'>;
}

export function zodEnumUnion({ object, options }: Params) {
  const literals = Object.values(object).filter((val) => typeof val === 'string');

  return z.string().refine((arg) => literals.includes(arg), options);
}
