import { Button } from 'antd';
import { useNavigate } from 'react-router';

export const ErrorPageElement = () => {
  const navigate = useNavigate();

  return (
    <div className='flex w-full h-screen justify-center items-center flex-col space-y-2'>
      <span className='text-xl tracking-widest'>Page Not Found</span>
      <Button onClick={() => navigate('/')}>Back Home</Button>
    </div>
  );
};
