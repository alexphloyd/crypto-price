import { Typography } from 'antd';
import { twMerge } from 'tailwind-merge';

interface Props {
  label: string;
  className?: string;
}

export const Topic = ({ label, className }: Props) => {
  return (
    <main className={twMerge(className, 'w-full flex flex-col space-y-2 mb-[7px]')}>
      <Typography.Text className='-mb-[6px] tracking-widest text-left text-[14px]'>{label}</Typography.Text>
      <span className='w-[85%] h-[1px] border-b-[1px] border-gray-100' />
    </main>
  );
};
