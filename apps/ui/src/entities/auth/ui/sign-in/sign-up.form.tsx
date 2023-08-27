import { Form } from '@app/shared/ui/form';
import { Input } from '@app/shared/ui/input';
import { NotificationProviderSelector } from '@app/widgets/notification-provider-selector/ui';
import { PhoneInput } from '@app/widgets/phone-input';
import { type ExtendedCreateUserInput, ExtendedCreateUserDto } from '@app/entities/auth/model';

export const SignUp = () => {
  const signUp = async (values: ExtendedCreateUserInput) => {
    console.log(values);
  };

  return (
    <Form onSubmit={signUp} schema={ExtendedCreateUserDto} submitText='Sign Up' className='w-full '>
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
