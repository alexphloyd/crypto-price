import { Typography } from 'antd';
import clsx from 'clsx';

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <main className={clsx('flex items-center', className)}>
      <img src='/logo.png' alt='logo' className='w-[67px]' />
      <div className='flex flex-col ml-2'>
        <Typography.Text className='font-croissant text-[16px] tracking-wider -mb-[5px]'>Demure</Typography.Text>
        <Typography.Text className='font-croissant text-[13px] tracking-wide'>Car Selling Platform</Typography.Text>
      </div>
    </main>
  );
};
