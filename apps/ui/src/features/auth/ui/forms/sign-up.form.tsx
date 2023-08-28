import { Form } from '@app/shared/ui/form';
import { Input } from '@app/shared/ui/input';
import { NotificationProviderSelector } from '@app/widgets/notification-provider-selector/ui';
import { PhoneInput } from '@app/widgets/phone-input';
import { ExtendedSignUpDto, ExtendedSignUpInput } from '@app/features/auth/model';
import { authModel } from '@app/features/auth';
import { useAppDispatch } from '@app/app/store/hooks';
import { OnSubmitResult } from '@app/shared/ui/form/types';
import { VerifyUserDto, type VerifyUserInput } from '@dto';
import { useRef } from 'react';
import { type User } from '@prisma/client';
import { BaseError } from '@api-types';

class A {
  code: VerifyUserDto['code'];
}

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const processStep = authModel.useSignInProcessStep();
  const signUpProcessUser = useRef<User>();

  const [signUp, { isLoading: isSignUpLoading, error: signUpError }] = authModel.api.signUp.useMutation();
  const [verify, { isLoading: isVerifyLoading, error: verifyError }] = authModel.api.verify.useMutation();

  const handleSignUp = async (credentials: ExtendedSignUpInput) => {
    Reflect.deleteProperty(credentials, 'confirmPassword');
    const signedUser = await signUp(credentials).unwrap();

    signUpProcessUser.current = signedUser;
    dispatch(authModel.actions.switchToVerificationStep());
  };

  const handleVerify = async (payload: Pick<VerifyUserInput, 'code'>) => {
    const userId = signUpProcessUser.current?.id;
    if (!userId) return;

    await verify({ code: payload.code, userId });
  };

  return processStep === 'credentials' ? (
    <SignUpForm onSubmit={handleSignUp} isLoading={isSignUpLoading} error={(signUpError as BaseError)?.data.message} />
  ) : (
    <VerificationForm
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
  onSubmit: (credentials: ExtendedSignUpInput) => Promise<void | OnSubmitResult>;
  isLoading: boolean;
  error?: string | undefined;
}) => (
  <Form
    onSubmit={onSubmit}
    schema={ExtendedSignUpDto}
    errorMessage={error}
    isLoading={isLoading}
    submitText='Sign Up'
    className='w-full'
  >
    <div className='flex flex-col gap-3  md:flex-row md:gap-4 items-center'>
      <Input name='name' label='Your name' />
      <Input name='surname' label='Surname' />
    </div>

    <Input name='email' type='email' label='Email' />

    <div className='flex flex-col gap-x-3 gap-y-3 md:flex-row md:gap-x-4 items-center'>
      <Input name='password' type='password' label='Password' />
      <Input name='confirmPassword' type='password' label='Confirm password' placeholder='confirm entered password' />
    </div>

    <PhoneInput name='phoneNumber' />

    <NotificationProviderSelector name='notificationProvider' label='Notification messenger' />
  </Form>
);

const VerificationForm = ({
  onSubmit,
  isLoading,
  error,
}: {
  onSubmit: (payload: Pick<VerifyUserInput, 'code'>) => Promise<void | OnSubmitResult>;
  isLoading: boolean;
  error?: string | undefined;
}) => (
  <Form
    onSubmit={onSubmit}
    schema={A}
    isLoading={isLoading}
    errorMessage={error}
    submitText='Verify'
    className='w-full'
  >
    <Input name='code' />
  </Form>
);