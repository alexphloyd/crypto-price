import { Button } from 'antd';
import { useNavigate } from 'react-router';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className='flex w-full h-[85vh] justify-center items-center flex-col space-y-2'>
      <span className='text-xl tracking-widest'>Access Denied</span>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};

export default AccessDenied;
