import { Typography } from 'antd';
import clsx from 'clsx';

interface Props {
  label: string;
  className?: string;
}

export const Topic = ({ label, className }: Props) => {
  return (
    <main className={clsx(className, 'w-full flex flex-col space-y-[0.4rem] mb-[6px]')}>
      <Typography.Text className='-mb-[3px] tracking-widest text-left text-[13px]'>{label}</Typography.Text>
      <span className='w-[85%] h-[1px] border-b-[1px] border-gray-100' />
    </main>
  );
};
