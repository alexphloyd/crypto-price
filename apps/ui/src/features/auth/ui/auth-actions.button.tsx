import { useAppDispatch } from '@app/app/store/hooks';
import { authModel } from '@app/features/auth';
import { Icon } from '@app/shared/ui/icon';
import { sidebarModel } from '@app/widgets/app-sidebar';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router';

export const AuthActions = () => {
  const dispatch = useAppDispatch();

  const session = authModel.useSession();
  const navigate = useNavigate();

  const handleRedirectToSignIn = () => {
    dispatch(sidebarModel.actions.close());
    navigate('/auth/sign-in');
  };

  const handleLogout = () => {
    navigate('/');
    dispatch(authModel.actions.logout());
  };

  if (!session) {
    return (
      <Button type='primary' className='w-full' onClick={handleRedirectToSignIn}>
        Sign In
      </Button>
    );
  }

  if (session) {
    return (
      <Button
        danger
        type='text'
        className='w-full flex items-center justify-center bg-red-200/60 hover:bg-red-100/70 text-[#e06777]'
        onClick={handleLogout}
      >
        <Icon name='logout' section='primary' className='-mt-[1px] w-4 h-4 text-[#df6374] mr-[9px] -mb-[1px]' />
        <Typography.Text className='text-[#b7515f]'>Log Out</Typography.Text>
      </Button>
    );
  }
};
