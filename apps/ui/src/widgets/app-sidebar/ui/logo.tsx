import { Typography } from 'antd';
import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

export const AppLogo = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');

  return (
    <main className={twMerge(className, 'flex items-center cursor-pointer')} onClick={handleClick}>
      <img src='/logo.png' alt='logo' className='w-[41px]' />
      <div className='flex flex-col ml-2'>
        <Typography.Text className='font-exo text-xl tracking-wider -mb-[4px]'>crypto-price</Typography.Text>
        <Typography.Text className='font-exo text-md tracking-wide text-cyan-800/70'>
          crypto tracking platform
        </Typography.Text>
      </div>
    </main>
  );
};
