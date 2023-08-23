import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { SubmitError } from './submit-error';
import { FormProps } from './types';
import { ForwardedRef, forwardRef } from 'react';

import clsx from 'clsx';
import { Button } from 'antd';
import { Loader } from '../loader';

export const Form = forwardRef(FormElement) as <S extends ZodType<any, any>>(
  props: FormProps<S> & { ref?: ForwardedRef<HTMLFormElement> }
) => ReturnType<typeof FormElement>;

function FormElement<S extends ZodType<any, any>>(
  {
    schema,
    onSubmit,
    errorMessage,
    submitText,
    children,
    isLoading,
    className,
    ...props
  }: FormProps<S>,
  ref: ForwardedRef<HTMLFormElement>
) {
  const ctx = useForm<z.infer<S>>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  const handleSubmit = ctx.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <FormProvider {...ctx}>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={clsx(className, 'flex flex-col gap-3')}
        {...props}
      >
        {children}

        {submitText ? (
          <div className='flex flex-col items-center'>
            <Button
              htmlType='submit'
              type='primary'
              className='mt-[14px] w-full'
              size='large'
            >
              {isLoading ? (
                <Loader
                  color='white'
                  size='sm'
                />
              ) : (
                submitText
              )}
            </Button>

            <SubmitError message={errorMessage} />
          </div>
        ) : null}
      </form>
    </FormProvider>
  );
}
