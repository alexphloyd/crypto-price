import { Typography } from 'antd';
import { authModel } from '@app/features/auth';
import { SignIn } from '@app/features/auth/ui/sign-in';

export default function SignInPage() {
  const activeTab = authModel.useAuthProcessTab();

  return (
    <main className='flex flex-col w-full items-center pt-[1vh]'>
      {activeTab === 'sign-up' ? <SignUpWelcomeLabel /> : <LoginWelcomeLabel />}
      <SignIn />
    </main>
  );
}

const SignUpWelcomeLabel = () => {
  return (
    <main className='text-center px-4'>
      <Typography.Paragraph className='text-[28px]'>Welcome to Crypto-price!</Typography.Paragraph>
      <Typography.Paragraph className='-mt-7 text-[13px] text-slate-500'>
        Let's create Your account to track the market.
      </Typography.Paragraph>
    </main>
  );
};

const LoginWelcomeLabel = () => {
  return (
    <main className='text-center px-4'>
      <Typography.Paragraph className='text-[28px]'>Welcome to Crypto-price!</Typography.Paragraph>
      <Typography.Paragraph className='-mt-7 text-[13px] text-slate-500'>
        If you don't have an account yet, switch to the next tab.
      </Typography.Paragraph>
    </main>
  );
};
