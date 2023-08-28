import { FormProvider, useForm } from 'react-hook-form';
import { ErrorLabel } from './error-label';
import { FormProps } from './types';
import { ForwardedRef, forwardRef } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import clsx from 'clsx';
import { Button } from 'antd';
import { Loader } from '../loader';

export const Form = forwardRef(FormElement) as <S extends new (...args: any) => any>(
  props: FormProps<S> & { ref?: ForwardedRef<HTMLFormElement> },
) => ReturnType<typeof FormElement>;

function FormElement<S extends new (...args: any) => any>(
  { schema, onSubmit, errorMessage, submitText, children, isLoading, className, ...props }: FormProps<S>,
  ref: ForwardedRef<HTMLFormElement>,
) {
  const ctx = useForm<InstanceType<S>>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: classValidatorResolver(schema),
  });

  const handleSubmit = ctx.handleSubmit(async (values) => {
    await onSubmit({ ...values });
  });

  return (
    <FormProvider {...ctx}>
      <form ref={ref} onSubmit={handleSubmit} className={clsx(className, 'flex flex-col gap-4')} {...props}>
        {children}

        {submitText ? (
          <div className='flex flex-col items-center'>
            <Button
              htmlType='submit'
              type='primary'
              className='mt-[14px] w-full items-center justify-center'
              size='large'
            >
              {isLoading ? <Loader color='white' size='sm' /> : submitText}
            </Button>

            <ErrorLabel message={errorMessage} />
          </div>
        ) : null}
      </form>
    </FormProvider>
  );
}
