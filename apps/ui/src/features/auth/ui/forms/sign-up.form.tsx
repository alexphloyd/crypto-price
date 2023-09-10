import { Form } from '@app/shared/ui/form';
import { Input } from '@app/shared/ui/input';
import { NotificationProviderSelector } from '@app/widgets/notification-provider-selector/ui';
import { PhoneInput } from '@app/widgets/phone-input';
import { authModel } from '@app/features/auth';
import { useAppDispatch } from '@app/app/store/hooks';
import { OnSubmitResult } from '@app/shared/ui/form/types';
import { useRef } from 'react';
import { type User } from '@prisma/client';
import { type BaseError } from '@api-types/errors/base';
import { z } from 'zod';
import { SignUpSchemaExtended, VerificationSchemaExtended } from '@app/features/auth/model';
import { VerificationForm } from '@app/features/auth/ui/forms/verification.form';

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const processStep = authModel.useSignInProcessStep();
  const signUpProcessUser = useRef<User>();

  const [signUp, { isLoading: isSignUpLoading, error: signUpError }] = authModel.api.signUp.useMutation();
  const [verify, { isLoading: isVerifyLoading, error: verifyError, data: verificationResponse }] =
    authModel.api.verify.useMutation();

  const handleSignUp = async (credentials: z.infer<typeof SignUpSchemaExtended>) => {
    Reflect.deleteProperty(credentials, 'confirmPassword');
    const signedUser = await signUp(credentials).unwrap();

    signUpProcessUser.current = signedUser;
    dispatch(authModel.actions.switchToVerificationStep());
  };

  const handleVerify = async (payload: z.infer<typeof VerificationSchemaExtended>) => {
    const userId = signUpProcessUser.current?.id;
    if (!userId) return;

    await verify({ code: payload.code, userId });
  };

  return processStep === 'credentials' ? (
    <SignUpForm onSubmit={handleSignUp} isLoading={isSignUpLoading} error={(signUpError as BaseError)?.data?.message} />
  ) : (
    <VerificationForm
      succesfullyVerified={verificationResponse?.verified ?? false}
      onSubmit={handleVerify}
      isLoading={isVerifyLoading}
      error={(verifyError as BaseError)?.data.message}
    />
  );
};

const SignUpForm = ({
  onSubmit,
  isLoading,
  error,
}: {
  onSubmit: (credentials: z.infer<typeof SignUpSchemaExtended>) => Promise<void | OnSubmitResult>;
  isLoading: boolean;
  error?: string | undefined;
}) => (
  <Form
    onSubmit={onSubmit}
    schema={SignUpSchemaExtended}
    errorMessage={error}
    isLoading={isLoading}
    submitText='Sign Up'
    className='w-full'
  >
    <div className='flex flex-col gap-3  md:flex-row md:gap-4 items-center'>
      <Input name='name' label='Your name' />
      <Input name='surname' label='Surname' />
    </div>

    <PhoneInput name='phoneNumber' />

    <NotificationProviderSelector name='notificationProvider' label='Notification messenger' />

    <Input name='email' type='email' label='Email' />

    <div className='flex flex-col gap-x-3 gap-y-3 md:flex-row md:gap-x-4 items-center'>
      <Input name='password' type='password' label='Password' />
      <Input name='confirm' type='password' label='Confirm password' placeholder='confirm entered password' />
    </div>
  </Form>
);
