import { z } from 'zod';
import { Form } from '@app/shared/ui/form';
import { Input } from '@app/shared/ui/input';
import { NotificationProviderSelector } from '@app/widgets/notification-provider-selector/ui';
import { PhoneInput } from '@app/widgets/phone-input';
import { authModel } from '@app/features/auth';
import { useAppDispatch } from '@app/app/store/hooks';
import { OnSubmitResult } from '@app/shared/ui/form/types';
import { type BaseError } from '@api-types/errors/base';
import { SignUpSchemaExtended, VerificationSchemaExtended } from '@app/features/auth/model';
import { VerificationForm } from '@app/features/auth/ui/forms/verification.form';

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const step = authModel.useAuthProcessStep();
  const processCredentials = authModel.useSignInProcessCredentials();

  const [signUp, { isLoading: isSignUpLoading, error: signUpError }] = authModel.api.signUp.useMutation();
  const [verify, { isLoading: isVerifyLoading, error: verifyError, data: verificationResponse }] =
    authModel.api.verify.useMutation();

  const handleSignUp = async (credentials: z.infer<typeof SignUpSchemaExtended>) => {
    Reflect.deleteProperty(credentials, 'confirmPassword');
    const signedUser = await signUp(credentials).unwrap();

    dispatch(authModel.actions.setSignInProcessCredentials(signedUser));
    dispatch(authModel.actions.switchAuthProcessStep('verification'));
  };

  const handleVerify = async (payload: z.infer<typeof VerificationSchemaExtended>) => {
    if (!processCredentials?.email) return;
    await verify({ code: payload.code, email: processCredentials.email });
  };

  return step === 'credentials' ? (
    <SignUpForm
      onSubmit={handleSignUp}
      isLoading={isSignUpLoading}
      error={(signUpError as BaseError)?.data?.message}
    />
  ) : (
    <VerificationForm
      successfullyVerified={!!verificationResponse?.verified}
      onSubmit={handleVerify}
      isLoading={isVerifyLoading}
      error={(verifyError as BaseError)?.data.message}
    />
  );
};

function SignUpForm({
  onSubmit,
  isLoading,
  error,
}: {
  onSubmit: (credentials: z.infer<typeof SignUpSchemaExtended>) => Promise<void | OnSubmitResult>;
  isLoading: boolean;
  error?: string | undefined;
}) {
  return (
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
        <Input
          name='confirm'
          type='password'
          label='Confirm password'
          placeholder='confirm entered password'
        />
      </div>
    </Form>
  );
}
