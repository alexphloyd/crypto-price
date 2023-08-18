export type TypeOfValue<T extends object, K extends keyof T> = T[K];

export type OmitStrict<
  T extends Record<string, unknown>,
  K extends keyof T
> = Omit<T, K>;

export type OmitReplace<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
> = keyof U extends infer R extends keyof T ? Omit<T, R> & U : never;

export type ExcludeStrict<T extends string, K extends T> = Exclude<T, K>;
