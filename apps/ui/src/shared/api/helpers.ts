import { type UncalibratedQueryValue } from './types';

export const isQueryParamValue = (value: unknown): boolean => {
  return typeof value === 'string' || typeof value === 'number';
};

export const createQueryParamsString = <T extends Record<string, UncalibratedQueryValue>>(params: T): URLSearchParams | null => {
  const queryParams = {} as Record<keyof T, string>;
  for (const key in params) {
    const value = params[key] as UncalibratedQueryValue;
    if (!isQueryParamValue(value)) return null;

    queryParams[key] = typeof value === 'number' ? String(value) : value;
  }

  return new URLSearchParams(queryParams);
};

export const createQueryString = (data: any) => {
  return Object.keys(data)
    .map((key) => {
      let val = data[key];
      if (val !== null && typeof val === 'object') val = createQueryString(val);
      return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`;
    })
    .join('&');
};
