import { Typography } from 'antd';
import clsx from 'clsx';

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <main className={clsx('flex items-center', className)}>
      <img src='/logo.png' alt='app-logo' className='w-6 h-6 mr-[13px] mt-[1.5px]' />
      <Typography.Text className='tracking-wider text-xl'>sync-vision</Typography.Text>
    </main>
  );
};
