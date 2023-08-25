import { Login } from '@app/entities/auth/ui/sign-in/log-in.form';
import { SignUp } from '@app/entities/auth/ui/sign-in/sign-up.form';
import { Tabs, TabsProps, Typography } from 'antd';
import { useState } from 'react';

export default function SignInPage() {
  const [currentAuthOption, setAuthOption] = useState<AuthOptionKey>('sign-up');

  const switchWelcomeText = (activeKey: AuthOptionKey) => {
    setAuthOption(activeKey);
  };

  return (
    <main className='flex flex-col w-full items-center'>
      {currentAuthOption === 'sign-up' ? <SignUpWelcome /> : <LoginWelcome />}
      <Tabs
        defaultActiveKey='sign-up'
        items={authOptions}
        centered
        onChange={(key) => switchWelcomeText(key as AuthOptionKey)}
        className='w-full sm:w-[80%] md:w-[70%] lg:w-[54%] xl:w-[45%] 2xl:w-[45%]'
      />
    </main>
  );
}

const authOptions: TabsProps['items'] = [
  {
    key: 'sign-up',
    label: 'Create an Account',
    children: <SignUp />,
  },
  {
    key: 'log-in',
    label: 'Log In',
    children: <Login />,
  },
];

const SignUpWelcome = () => {
  return (
    <main className='text-center px-4 mb-6'>
      <Typography.Paragraph className='text-[28px]'>Welcome to sync-vision!</Typography.Paragraph>
      <Typography.Paragraph className='-mt-6 text-[13px] text-slate-500'>
        Let's create Your account to synchronize team perspective.
      </Typography.Paragraph>
      <Typography.Paragraph className='-mt-3 -mb-3 text-[13px] text-slate-500'>
        Specify your messenger to receive instant notifications.
      </Typography.Paragraph>
    </main>
  );
};

const LoginWelcome = () => {
  return (
    <main className='text-center px-4 mb-6'>
      <Typography.Paragraph className='text-[28px]'>Welcome back!</Typography.Paragraph>
      <Typography.Paragraph className='-mt-6 text-[13px] text-slate-500'>
        If you don't have an account yet, switch to the next tab.
      </Typography.Paragraph>
      <Typography.Paragraph className='-mt-3 -mb-3 text-[13px] text-slate-500'>
        You'll receive action notifications to your messenger.
      </Typography.Paragraph>
    </main>
  );
};

type AuthOptionKey = 'sign-up' | 'log-in';
