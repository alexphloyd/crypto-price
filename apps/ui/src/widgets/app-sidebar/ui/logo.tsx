import { Typography } from 'antd';
import { twMerge } from 'tailwind-merge';

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <main className={twMerge(className, 'flex items-center')}>
      <img src='/logo.png' alt='logo' className='w-[43px]' />
      <div className='flex flex-col ml-2'>
        <Typography.Text className='font-exo text-xl tracking-wider -mb-[5px]'>Crypto-price</Typography.Text>
        <Typography.Text className='font-exo text-md tracking-wide text-cyan-800/70'>
          crypto tracking platform
        </Typography.Text>
      </div>
    </main>
  );
};
