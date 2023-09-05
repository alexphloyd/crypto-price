import { type Primitive, z, type ZodLiteral, ZodNever } from 'zod';

type MappedZodLiterals<T extends readonly Primitive[]> = {
  -readonly [K in keyof T]: ZodLiteral<T[K]>;
};

function createManyUnion<A extends readonly [Primitive, Primitive, ...Primitive[]]>(
  literals: A,
  { message }: { message?: string },
) {
  return z.union(
    literals.map((value) =>
      z.literal(value, { errorMap: message ? () => ({ message }) : undefined }),
    ) as MappedZodLiterals<A>,
  );
}

export function createUnionSchema<T extends readonly []>(values: T, { message }: { message?: string }): ZodNever;
export function createUnionSchema<T extends readonly [Primitive]>(
  values: T,
  { message }: { message?: string },
): ZodLiteral<T[0]>;
export function createUnionSchema<T extends readonly [Primitive, Primitive, ...Primitive[]]>(
  values: T,
  { message }: { message?: string },
): z.ZodUnion<MappedZodLiterals<T>>;
export function createUnionSchema<T extends readonly Primitive[]>(values: T, { message }: { message?: string }) {
  if (values.length > 1) {
    return createManyUnion(values as typeof values & [Primitive, Primitive, ...Primitive[]], { message });
  } else if (values.length === 1) {
    return z.literal(values[0]);
  } else if (values.length === 0) {
    return z.never();
  }

  return z.never();
}
