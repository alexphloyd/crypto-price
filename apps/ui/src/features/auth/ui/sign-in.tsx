import { useAppDispatch } from '@app/app/store/hooks';
import { authModel } from '@app/features/auth';
import { type SignInProcess } from '@app/features/auth/model/types';
import { Login } from '@app/features/auth/ui/forms/log-in.form';
import { SignUp } from '@app/features/auth/ui/forms/sign-up.form';
import { TypeOfValue } from '@utility-types';
import { Tabs, TabsProps } from 'antd';

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const activeTab = authModel.useSignInTab();

  return (
    <Tabs
      activeKey={activeTab}
      items={tabOptions}
      centered
      onChange={(key: string) => dispatch(authModel.actions.switchTabByKey(key as TypeOfValue<SignInProcess, 'tab'>))}
      className='w-full sm:w-[80%] md:w-[70%] lg:w-[54%] xl:w-[45%] 2xl:w-[45%]'
    />
  );
};

const tabOptions: TabsProps['items'] = [
  {
    key: 'sign-up' as TypeOfValue<SignInProcess, 'tab'>,
    label: 'Create an Account',
    children: <SignUp />,
  },
  {
    key: 'log-in' as TypeOfValue<SignInProcess, 'tab'>,
    label: 'Log In',
    children: <Login />,
  },
];
