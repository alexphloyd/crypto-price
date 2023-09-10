import { useAppDispatch } from '@app/app/store/hooks';
import { authModel } from '@app/features/auth';
import { VerificationSchemaExtended } from '@app/features/auth/model';
import { Form } from '@app/shared/ui/form';
import { type OnSubmitResult } from '@app/shared/ui/form/types';
import { Input } from '@app/shared/ui/input';
import { Typography } from 'antd';
import { useState, useEffect } from 'react';
import { z } from 'zod';

export const VerificationForm = ({
  onSubmit,
  isLoading,
  succesfullyVerified,
  error,
}: {
  onSubmit: (payload: z.infer<typeof VerificationSchemaExtended>) => Promise<void | OnSubmitResult>;
  isLoading: boolean;
  succesfullyVerified: boolean;
  error?: string | undefined;
}) => {
  const dispatch = useAppDispatch();
  const activeTab = authModel.useAuthProcessTab();

  const [timeToSwitchTab, setTimeToSwitchTab] = useState(4);

  useEffect(() => {
    if (!succesfullyVerified) return;

    const timeout = setInterval(() => {
      setTimeToSwitchTab((prev) => prev - 1);
    }, 1000);

    if (timeToSwitchTab <= 0) {
      clearInterval(timeout);

      if (activeTab === 'sign-up') {
        dispatch(authModel.actions.switchAuthProcessTab('log-in'));
      }
    }
    return () => clearInterval(timeout);
  }, [timeToSwitchTab, succesfullyVerified]);

  if (succesfullyVerified) {
    return (
      <section className='flex flex-col items-center justify-center'>
        <Typography.Text className='text-[16px]'>Your Account succesfully created!</Typography.Text>
        <Typography.Text className='text-[16px]'>
          You will be redirected to the login tab in {timeToSwitchTab} seconds...
        </Typography.Text>
      </section>
    );
  }

  return (
    <Form
      onSubmit={onSubmit}
      schema={VerificationSchemaExtended}
      isLoading={isLoading}
      errorMessage={error}
      submitText='Apply'
      className='w-full'
    >
      <Typography.Text className='text-[15px]'>
        Please, check your{' '}
        <a href='https://gmail.com' target='_blank' rel='noreferrer' className='text-cyan-500'>
          email!
        </a>
      </Typography.Text>

      <Input name='code' label='Verification code' />
    </Form>
  );
};
