import { SignUp } from '@app/entities/auth/ui/sign-in/sign-up.form';
import { Typography } from 'antd';

export default function SignInPage() {
  return (
    <main className='flex flex-col w-full items-center pt-16 space-y-7'>
      <SignUp />
      <SignUpWelcome />
    </main>
  );
}

const SignUpWelcome = () => {
  return (
    <main>
      <Typography.Title>Welcome to sync-vision!</Typography.Title>
      <Typography.Paragraph>Let's create Your account to synchronize team perspective.</Typography.Paragraph>
      <Typography.Paragraph>Specify your messenger to receive instant notifications</Typography.Paragraph>
    </main>
  );
};
