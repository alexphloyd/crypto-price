import { useAppDispatch } from '@app/app/store/hooks';
import { authModel } from '@app/features/auth';
import { type SignInProcess } from '@app/features/auth/model/types';
import { Login } from '@app/features/auth/ui/forms/log-in.form';
import { SignUp } from '@app/features/auth/ui/forms/sign-up.form';
import { type TypeOfValue } from '@utils/types';
import { Tabs, TabsProps } from 'antd';

const TAB_OPTIONS: TabsProps['items'] = [
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

export function SignIn() {
  const dispatch = useAppDispatch();
  const activeTab = authModel.useAuthProcessTab();

  const handleChangeTab = (key: TypeOfValue<SignInProcess, 'tab'>) => {
    dispatch(authModel.actions.switchAuthProcessStep('credentials'));
    dispatch(authModel.actions.switchAuthProcessTab(key as TypeOfValue<SignInProcess, 'tab'>));
  };

  return (
    <Tabs
      centered
      items={TAB_OPTIONS}
      activeKey={activeTab}
      onChange={(key: string) => handleChangeTab(key as TypeOfValue<SignInProcess, 'tab'>)}
      className='w-full sm:w-[80%] md:w-[70%] lg:w-[54%] xl:w-[45%] 2xl:w-[45%]'
    />
  );
}
