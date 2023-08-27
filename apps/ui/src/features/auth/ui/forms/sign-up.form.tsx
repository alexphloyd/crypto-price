import { Form } from '@app/shared/ui/form';
import { Input } from '@app/shared/ui/input';
import { NotificationProviderSelector } from '@app/widgets/notification-provider-selector/ui';
import { PhoneInput } from '@app/widgets/phone-input';
import { type ExtendedSignUpInput, ExtendedSignUpDto } from '@app/features/auth/model';

// CredentialsForm || Verification Form

// after successful sign up user in db - switch to Verification Form
// in Ver. Form enter Code and send
// if successful - Green Check!!! -  'Please, log in to your account to continue'
// button continue to switch in login and timeout 7 sec to redirect to login form

export const SignUp = () => {
  const signUp = async (userCredentials: ExtendedSignUpInput) => {
    console.log(userCredentials);
  };

  return (
    <Form onSubmit={signUp} schema={ExtendedSignUpDto} submitText='Sign Up' className='w-full '>
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
};
