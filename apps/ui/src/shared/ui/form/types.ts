import { PropsWithoutRef, ReactNode } from 'react';
import { type OmitStrict } from '@utils/types';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

export const FORM_ERROR = 'FORM_ERROR';

export interface OnSubmitResult {
  FORM_ERROR?: string;
  [prop: string]: unknown;
}

export interface FormProps<S extends z.ZodType<any, any>>
  extends OmitStrict<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  schema: S;
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>;
  isLoading?: boolean;
  errorMessage?: string | null | undefined;
  submitText?: string | undefined;
  addClass?: string | undefined;
  children?: ReactNode | undefined;
  initialValues?: UseFormProps<z.infer<S>>['defaultValues'];
}
