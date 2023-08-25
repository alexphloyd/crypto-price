import { SignUp } from '@app/entities/auth/ui/sign-in/sign-up.form';
import { Typography } from 'antd';

export default function SignInPage() {
  return (
    <main className='flex flex-col w-full items-center'>
      <SignUpWelcome />
      <SignUp />
    </main>
  );
}

const SignUpWelcome = () => {
  return (
    <main className='text-center px-4 mb-8'>
      <Typography.Paragraph className='text-2xl'>Welcome to sync-vision!</Typography.Paragraph>
      <Typography.Paragraph className='-mt-5 text-[13px] text-slate-500'>
        Let's create Your account to synchronize team perspective.
      </Typography.Paragraph>
      <Typography.Paragraph className='-mt-3 -mb-3 text-[13px] text-slate-500'>
        Specify your messenger to receive instant notifications
      </Typography.Paragraph>
    </main>
  );
};
