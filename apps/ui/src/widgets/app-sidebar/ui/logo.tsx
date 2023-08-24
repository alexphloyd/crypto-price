import { Typography } from 'antd';
import clsx from 'clsx';

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <main className={clsx('flex items-center', className)}>
      <img src='/logo.png' alt='app-logo' className='w-7 h-7 mr-[10px]' />
      <Typography.Text className='tracking-wider text-xl'>sync-vision</Typography.Text>
    </main>
  );
};
