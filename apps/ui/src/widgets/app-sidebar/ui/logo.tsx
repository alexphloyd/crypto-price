import { Icon } from '@app/shared/ui/icon';
import clsx from 'clsx';

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <main className={clsx('flex items-center', className)}>
      <Icon name='app-logo' className='text-cyan-700 w-[188px] max-h-[50px]' />
    </main>
  );
};
