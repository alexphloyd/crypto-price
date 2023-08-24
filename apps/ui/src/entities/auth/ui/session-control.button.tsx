import { useAppDispatch } from '@app/app/store/hooks';
import { Icon } from '@app/shared/ui/icon';
import { sidebarModel } from '@app/widgets/app-sidebar';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router';

export const SessionControl = () => {
  const dispatch = useAppDispatch();

  const session = false;
  const navigate = useNavigate();

  const handleRedirectToSignIn = () => {
    dispatch(sidebarModel.actions.close());
    navigate('/auth/sign-in');
  };
  const handleLogout = () => 0; // TODO

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
        className='w-full flex items-center justify-center bg-red-100/20 hover:bg-red-100/70'
        onClick={handleLogout}
      >
        <Icon name='logout' section='primary' className='w-4 h-4 text-[#ff7889] mr-[9px] -mb-[1px]' />
        <Typography.Text>Log Out</Typography.Text>
      </Button>
    );
  }
};
