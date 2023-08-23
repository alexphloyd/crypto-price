import clsx from 'clsx';

interface Props {
  label: string;
  className?: string;
}

export const Topic = ({ label, className }: Props) => {
  return (
    <main className={clsx(className, 'w-full flex flex-col space-y-[0.4rem] mb-2')}>
      <span className='text-gray-600 font-light tracking-wider text-left text-[12px]'>{label}</span>
      <span className='w-[85%] h-[1px] border-b-[1px] border-gray-100' />
    </main>
  );
};
