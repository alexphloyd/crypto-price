import { PropsWithoutRef, ReactNode } from 'react';
import { OmitStrict } from '@utility-types';

export interface OnSubmitResult {
  FORM_ERROR?: string;
  [prop: string]: unknown;
}

export interface FormProps<S extends new (...args: any) => any>
  extends OmitStrict<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  schema: S;
  onSubmit: (values: InstanceType<S>) => Promise<void | OnSubmitResult>;
  isLoading?: boolean;
  errorMessage?: string | null | undefined;
  submitText?: string | undefined;
  children?: ReactNode | undefined;
  className?: string;
}

export const FORM_ERROR = 'FORM_ERROR';
